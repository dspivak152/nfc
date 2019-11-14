import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RoomAvailable, RoomAvailabiltyResponse } from '../models/index'
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  headers: Headers;
  constructor(private http: HttpClient,
    public snackBar: MatSnackBar) { }

  getHotels(): Observable<any> {
    return this.http.get<any>('http://sinfori.com:3080/api/hotels');
  }

  getCountries(): Observable<any> {
    return this.http.get<any>('http://sinfori.com:3080/api/locations/countries');
  }

  getCities(countryId: number): Observable<any> {
    return this.http.get<any>('http://sinfori.com:3080/api/locations/cities/' + countryId);
  }

  checkRoomAvailabilty(newRoom: RoomAvailable): Observable<RoomAvailabiltyResponse> {
    return this.http.post<RoomAvailabiltyResponse>('http://sinfori.com:3080/api/devices', newRoom).pipe(
      catchError(this.handleError<any>('Unable to create new room')));;
  }

  getDevices(token: string): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.get<any>('http://sinfori.com:3080/api/devices', { headers: reqHeader });
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.snackBar.open(error.statusText, '', { duration: 2000 });
      return of(result as T);
    };
  }
}
