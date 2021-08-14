import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService,
    private http: HttpClient,
    public snackBar: MatSnackBar) { }

  public isAutheticated(): boolean {
    const token = localStorage.getItem('token');
    return true;
  }

  login(loginObject: any) {
    return this.http.post<any>('http://sinfori.com:3080/login', { username: "admin", password: "mini" }).pipe(
      catchError(this.handleError<any>('Unable to create new room')));;
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.snackBar.open(error.statusText, '', { duration: 2000 });
      return of(result as T);
    };
  }
}
