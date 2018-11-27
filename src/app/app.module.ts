import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterTrayComponent } from './register-tray/register-tray.component';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { JwtModule, JwtHelperService, JwtModuleOptions } from '@auth0/angular-jwt';
import { HomeComponent } from './home/home.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

const JWT_Module_Options: JwtModuleOptions = {
  config: {
      tokenGetter: tokenGetter
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterTrayComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JwtModule.forRoot(JWT_Module_Options)
  ],
  providers: [AuthService, JwtHelperService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
