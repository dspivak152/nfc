import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) { }

  getHotels(): Observable<any> {
    return this.http.get<any>('http://sinfori.dev.valigar.co.il:3080/api/hotels');
  }

  getCountries(): Observable<any> {
    return this.http.get<any>('http://sinfori.dev.valigar.co.il:3080/api/locations/countries');
  }

  getCities(countryId: number): Observable<any> {
    return this.http.get<any>('http://sinfori.dev.valigar.co.il:3080/api/locations/cities/' + countryId);
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}
