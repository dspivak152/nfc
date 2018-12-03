import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceService } from '../services/index';

@Component({
  selector: 'app-register-tray',
  templateUrl: './register-tray.component.html',
  styleUrls: ['./register-tray.component.css']
})
export class RegisterTrayComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thiredFormGroup: FormGroup;

  constructor(private deviceService: DeviceService, private _formBuilder: FormBuilder) { }


  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      emailCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      countryCtrl: ['', Validators.required],
      cityCtrl: ['', Validators.required],
      hotelNameCtrl: ['', Validators.required]
    });
    this.thiredFormGroup = this._formBuilder.group({
      wifiNameCtrl: ['', Validators.required],
      wifiPasswordCtrl: ['', Validators.required]
    });

    this.deviceService.getDevices().subscribe(result => {
      console.log(result);
    });
  }
}
