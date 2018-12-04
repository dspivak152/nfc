import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceService } from '../services/index';
import { HotelInterface } from '../interfaces/index';
import { SendNfcMessage } from '../models/index';
import { WindowRef } from '../WindowRef';

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
  sendNfcMessage = new SendNfcMessage();
  hotels: HotelInterface[] = [];

  constructor(private deviceService: DeviceService, 
              private _formBuilder: FormBuilder,
              private winRef: WindowRef) { }

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

    this.deviceService.getHotels().subscribe(result => {
      if (result)
        this.hotels = result;
      console.log(result);
    });
  }

  sendMessageToNfc(){
    this.winRef.nativeWindow.foo();
  }
}
