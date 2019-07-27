import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredefinedDataComponent } from './predefined-data.component';

describe('PredefinedDataComponent', () => {
  let component: PredefinedDataComponent;
  let fixture: ComponentFixture<PredefinedDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredefinedDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredefinedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
