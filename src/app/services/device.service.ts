import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RoomAvailable, RoomAvailabiltyResponse, GenericModel } from '../models/index'
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpAdapterService } from './http-adapter.service';
import { API_BASE_URL } from './api-base-url';
@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  headers: Headers;
  constructor(private http: HttpClient,
    public snackBar: MatSnackBar,
    private httpAdapterService: HttpAdapterService) { }

  getHotels(): Observable<any> {
    return this.httpAdapterService.get<any>(API_BASE_URL + '/hotels');
  }

  getCountries(): Observable<GenericModel[]> {
    return this.httpAdapterService.get<any>(API_BASE_URL + '/locations/countries')
      .pipe(
        // tap(_ => this.log('fetched countries')),
        catchError(this.handleError<GenericModel[]>('getHeroes', []))
      );
  }

  private log(message: string) {
    console.log(`deviceService: ${message}`);
  }

  getCities(countryId: number): Observable<any> {
    return this.httpAdapterService.get<any>(API_BASE_URL + '/locations/cities/' + countryId);
  }

  checkRoomAvailabilty(newRoom: RoomAvailable, token: string): Observable<RoomAvailabiltyResponse> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.httpAdapterService.post<any>(API_BASE_URL + '/devices', newRoom, reqHeader).pipe(
      catchError(this.handleError<any>('Unable to create new room'))
    );
  }

  getDevices(token: string): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.httpAdapterService.get<any>(API_BASE_URL + '/devices', { headers: reqHeader })
  }

  getRoomsOverviewData(hotelId: number, token: string): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.httpAdapterService.get<any>(API_BASE_URL + '/hotels/' + hotelId + '/rooms/overview', { headers: reqHeader })
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.snackBar.open(error.statusText, '', { duration: 2000 });
      return of(result as T);
    };
  }
}
