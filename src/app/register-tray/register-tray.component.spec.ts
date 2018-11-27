import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTrayComponent } from './register-tray.component';

describe('RegisterTrayComponent', () => {
  let component: RegisterTrayComponent;
  let fixture: ComponentFixture<RegisterTrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterTrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
