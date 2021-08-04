import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterTrayComponent } from './register-tray/register-tray.component';
import { AuthService, AuthGuardService, DeviceService } from './services/index';
import { JwtModule, JwtHelperService, JwtModuleOptions } from '@auth0/angular-jwt';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { MaterialModule } from './material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { WindowRef } from './WindowRef';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './services/spinner.service';
import { PredefinedDataComponent } from './predefined-data/predefined-data.component';
import { RegisteredDevicesComponent } from './registered-devices/registered-devices.component';

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
    RegisterTrayComponent,
    HomeComponent,
    DashboardComponent,
    SpinnerComponent,
    PredefinedDataComponent,
    RegisteredDevicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot(JWT_Module_Options)
  ],
  providers: [AuthService, JwtHelperService, AuthGuardService, DeviceService, WindowRef, SpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
