import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'projects/auth/src/public_api';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private authService:AuthService) { }

  ngOnInit() {
this.authService.logout()
    //console.log(this.activatedRoute.snapshot.parent._routerState.url)
  }

}
