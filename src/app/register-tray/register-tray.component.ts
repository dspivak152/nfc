import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../services/index';

@Component({
  selector: 'app-register-tray',
  templateUrl: './register-tray.component.html',
  styleUrls: ['./register-tray.component.css']
})
export class RegisterTrayComponent implements OnInit {

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.deviceService.getDevices().subscribe(result => {
      console.log(result);
    });
  }

}
