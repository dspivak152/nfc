import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  //   let routerSpy = {
  //     navigate: jest.spyOn(Router, 'navigate')
  //  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            'url': from([{
              'id': 1
            }])
          }

        },
        { provide: Router, useValue: null }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
