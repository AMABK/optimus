import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  message = 'hjghj';
  constructor() { }

  ngOnInit() {
  }

    /** Reference to the directive instance of the ripple. */
  @ViewChild(MatRipple) ripple: MatRipple;

  /** Shows a centered and persistent ripple. */
  launchRipple() {
    const rippleRef = this.ripple.launch({
      persistent: true,
      centered: true
    });

    // Fade out the ripple later.
    rippleRef.fadeOut();
  }

}
