import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DeviceService } from '../services/index';
import { HotelInterface } from '../interfaces/index';
import { MessageNfcModel } from '../models/index';
import { WindowRef } from '../WindowRef';

@Component({
  selector: 'app-register-tray',
  templateUrl: './register-tray.component.html',
  styleUrls: ['./register-tray.component.scss']
})
export class RegisterTrayComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thiredFormGroup: FormGroup;
  hotels: HotelInterface[] = [];
  messageNfcModel = new MessageNfcModel();

  constructor(private deviceService: DeviceService,
    private _formBuilder: FormBuilder,
    private winRef: WindowRef) { }

  ngOnInit() {
    this.firstFormGroup = new FormGroup({
      firstCtrl: new FormControl(),
      emailCtrl: new FormControl()
    });

    this.secondFormGroup = new FormGroup({
      countryCtrl: new FormControl(),
      cityCtrl: new FormControl(),
      hotelCtrl: new FormControl()
    });

    this.thiredFormGroup = new FormGroup({
      wifiNameCtrl: new FormControl(),
      wifiPasswordCtrl: new FormControl()
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      emailCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      countryCtrl: ['', Validators.required],
      cityCtrl: ['', Validators.required],
      hotelCtrl: ['', Validators.required]
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

  sendMessageToNfc() {
    console.log(this.messageNfcModel);
    this.winRef.nativeWindow.foo(this.messageNfcModel);
  }
}
