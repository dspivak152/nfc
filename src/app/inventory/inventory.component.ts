import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, forkJoin } from 'rxjs';
import { ArraySimpleInterface } from '../interfaces';
import { AuthService, DeviceService } from '../services';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InventoryComponent implements OnInit {
  data: any[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  hotelDevices: any[] = [];
  devicesResult: any[] = [];
  columnsToDisplay: string[] = ['roomNumber', 'created', 'deviceType', 'deviceBattery'];

  public hotels: ArraySimpleInterface[] = [];
  public hotelsForFilter: ArraySimpleInterface[] = [];
  public responseLogin: any;
  selectedHotel: number;
  expandedElement: any | null;

  constructor(private authService: AuthService,
    private deviceService: DeviceService,
    private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.requestDataFromMultipleSources().subscribe(responseList => {
      this.spinnerService.hide();
      this.hotels = responseList[0];
      this.responseLogin = responseList[1];
    });
  }

  public requestDataFromMultipleSources(): Observable<any[]> {
    let response1 = this.deviceService.getHotels();
    let response2 = this.authService.login({});
    return forkJoin([response1, response2]);
  }

  showInventoryForHotel() {
    if (!isNaN(this.selectedHotel)) {
      this.deviceService.getRoomsOverviewData(this.selectedHotel, this.responseLogin).subscribe(result => {
        console.log(result)
        this.hotelDevices = result;
      })
    }
  }

}
