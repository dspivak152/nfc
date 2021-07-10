import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RoomAvailable, RoomAvailabiltyResponse, GenericModel } from '../models/index'
import { catchError, tap } from 'rxjs/operators';
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

  getCountries(): Observable<GenericModel[]> {
    return this.http.get<GenericModel[]>('http://sinfori.com:3080/api/locations/countries')
  }

  getHeroes(): Observable<GenericModel[]> {
    return this.http.get<GenericModel[]>('http://sinfori.com:3080/api/locations/countries')
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<GenericModel[]>('getHeroes', []))
      );
  }

  private log(message: string) {
    console.log(`HeroService: ${message}`);
  }

  getCities(countryId: number): Observable<any> {
    return this.http.get<any>('http://sinfori.com:3080/api/locations/cities/' + countryId);
  }

  checkRoomAvailabilty(newRoom: RoomAvailable, token: string): Observable<RoomAvailabiltyResponse> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return this.http.post<RoomAvailabiltyResponse>('http://sinfori.com:3080/api/devices', newRoom, { headers: reqHeader }).pipe(
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
