import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) { }

  public isAutheticated(): boolean {
    const token = localStorage.getItem('token');
    return true ;
    //return !this.jwtHelper.isTokenExpired(token);
  }
}
