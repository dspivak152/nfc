import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterTrayComponent } from './register-tray/register-tray.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'register-tray', component: RegisterTrayComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
