import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { RegisterTrayComponent } from './register-tray/register-tray.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PredefinedDataComponent } from './predefined-data/predefined-data.component';
import { RegisteredDevicesComponent } from './registered-devices/registered-devices.component';
const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    {
        path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'register-tray', component: RegisterTrayComponent, canActivate: [AuthGuard] },
            { path: 'predefine-data', component: PredefinedDataComponent, canActivate: [AuthGuard] },
            { path: 'registered-devices', component: RegisteredDevicesComponent, canActivate: [AuthGuard] }
        ]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
