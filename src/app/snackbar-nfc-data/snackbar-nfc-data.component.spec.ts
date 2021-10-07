import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarNfcDataComponent } from './snackbar-nfc-data.component';

describe('SnackbarNfcDataComponent', () => {
  let component: SnackbarNfcDataComponent;
  let fixture: ComponentFixture<SnackbarNfcDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackbarNfcDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarNfcDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
