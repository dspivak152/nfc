import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService, DeviceService } from '../services/index';
import { MatPaginator, MatSort } from '@angular/material';
import { Observable, forkJoin } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';
import { ArraySimpleInterface } from '../interfaces';

@Component({
  selector: 'app-registered-devices',
  templateUrl: './registered-devices.component.html',
  styleUrls: ['./registered-devices.component.css']
})
export class RegisteredDevicesComponent implements OnInit {
  data: any[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any[] = [];
  devicesResult: any[] = [];
  displayedColumns: string[] = ['created', 'hotelId', 'name', 'roomNumber'];

  public hotels: ArraySimpleInterface[] = [];
  public hotelsForFilter: ArraySimpleInterface[] = [];
  public responseLogin: any;
  selectedHotel: number;

  constructor(private authService: AuthService,
    private deviceService: DeviceService,
    private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.requestDataFromMultipleSources().subscribe(responseList => {
      this.spinnerService.hide();
      this.hotels = responseList[0];
      this.responseLogin = responseList[1];
      this.deviceService.getDevices(this.responseLogin.token).subscribe(result => {
        this.devicesResult = result;
      });

    });
  }

  public requestDataFromMultipleSources(): Observable<any[]> {
    let response1 = this.deviceService.getHotels();
    let response2 = this.authService.login({});
    return forkJoin([response1, response2]);
  }

  showDevicesForHotel() {
    if (!isNaN(this.selectedHotel)) {
      this.dataSource = this.devicesResult.filter(element => (<any>element).hotelId == this.selectedHotel);
      this.dataSource.forEach((hotel) => {
        let hotelTemp = this.hotels.find(elemnt => (<any>elemnt).id == hotel.hotelId);
        if (hotelTemp) {
          hotel.hotelId = (<any>hotelTemp).name;
        }
      });
    }
  }

}
