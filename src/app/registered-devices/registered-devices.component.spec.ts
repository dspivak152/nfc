import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredDevicesComponent } from './registered-devices.component';

describe('RegisteredDevicesComponent', () => {
  let component: RegisteredDevicesComponent;
  let fixture: ComponentFixture<RegisteredDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
