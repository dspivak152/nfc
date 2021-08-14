import { Component, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  @ViewChild('snav', { static: true }) drawer: MatSidenav;
  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  public toggleSidenav() {
    this.drawer.close();
  }

}