import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HttpAdapterService {

  constructor(private httpClient: HttpClient) { }

  patch<T>(url: string, body: any): Promise<T> {
    return this.httpClient.patch<T>(url, body).toPromise();
  }

  post<T>(url: string, body: any, reqHeader: any): Observable<T> {
    return this.httpClient.post<T>(url, body, { headers: reqHeader });
  }

  get<T>(url: string, reqHeader?: any): Observable<T> {
    return this.httpClient.get<T>(url, { headers: reqHeader });
  }
}
