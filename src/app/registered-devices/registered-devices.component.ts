import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AuthService, DeviceService } from '../services/index';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, Observable, of as observableOf, forkJoin } from 'rxjs';
import { startWith, switchMap, map, catchError, find } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SpinnerService } from '../services/spinner.service';
import { ArraySimpleInterface } from '../interfaces';

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

@Component({
  selector: 'app-registered-devices',
  templateUrl: './registered-devices.component.html',
  styleUrls: ['./registered-devices.component.css']
})
export class RegisteredDevicesComponent implements OnInit, AfterViewInit {
  exampleDatabase: ExampleHttpDatabase | null;
  data: any[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any[] = [];
  displayedColumns: string[] = ['created', 'hotelId', 'name', 'roomNumber'];

  public hotels: ArraySimpleInterface[] = [];
  public responseLogin: any;

  constructor(private authService: AuthService,
    private deviceService: DeviceService,
    private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.requestDataFromMultipleSources().subscribe(responseList => {
      this.hotels = responseList[0];
      this.responseLogin = responseList[1];
      this.deviceService.getDevices(this.responseLogin.token).subscribe(result => {
        this.dataSource = result;
        this.dataSource.forEach((hotel) => {
          let hotelTemp = this.hotels.find(elemnt => (<any>elemnt).id == hotel.hotelId);
          if (hotelTemp) {
            hotel.hotelId = (<any>hotelTemp).name;
          }
        });
        //this.spinnerService.hide();
      });

    });

    // this.deviceService.getHotels().subscribe(hotels => {
    //   this.hotels = hotels;
    // });

    // this.spinnerService.show();
    // this.authService.login({}).subscribe(res => {
    //   this.deviceService.getDevices(res.token).subscribe(result => {
    //     this.dataSource = result;
    //     this.spinnerService.hide();
    //   });
    // });
  }

  public requestDataFromMultipleSources(): Observable<any[]> {
    let response1 = this.deviceService.getHotels();
    let response2 = this.authService.login({});
    return forkJoin([response1, response2]);
  }

  ngAfterViewInit() {
    //this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // this.spinnerService.show();
    // this.authService.login({}).subscribe(res => {

    //   return this.deviceService.getDevices(res.token);
    // });

    //this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.


    //   merge(this.sort.sortChange, this.paginator.page)
    //     .pipe(
    //       startWith({}),
    //       switchMap(() => {
    //         this.isLoadingResults = true;
    //         return this.authService.login({}).subscribe(res => {

    //           return this.deviceService.getDevices(res.token);
    //         })
    //         // return this.exampleDatabase!.getRepoIssues(
    //         //   this.sort.active, this.sort.direction, this.paginator.pageIndex);
    //       }),
    //       map(data => {
    //         // Flip flag to show that loading has finished.
    //         this.isLoadingResults = false;
    //         this.isRateLimitReached = false;
    //         this.resultsLength = (<any>data).total_count;

    //         return (<any>data).items;
    //       }),
    //       catchError(() => {
    //         this.isLoadingResults = false;
    //         // Catch if the GitHub API has reached its rate limit. Return empty data.
    //         this.isRateLimitReached = true;
    //         return observableOf([]);
    //       })
    //     ).subscribe(data => this.data = data);
    // }
  }

}

export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) { }

  getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl =
      `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;

    return this._httpClient.get<GithubApi>(requestUrl);
  }
}

