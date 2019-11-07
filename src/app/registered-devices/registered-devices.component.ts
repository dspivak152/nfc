import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/index';
@Component({
  selector: 'app-registered-devices',
  templateUrl: './registered-devices.component.html',
  styleUrls: ['./registered-devices.component.css']
})
export class RegisteredDevicesComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // this.authService.login(null).subscribe(result => {
    //   console.log(result);
    //   if (result && result.token) {
    //     //get devices
    //   }
    // });
  }

}
