import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../http/user/user.service';
import { NotificationService } from 'projects/notification/src/public_api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  code = '';
  email = '';
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.code = params.get("code")
      this.activatedRoute.queryParams.subscribe(params => {
        this.email = params['email'];
        const request = {
          email: this.email,
          code: this.code
        }
        this.userService.acceptGroupInviteRequest(request).subscribe(res => {
          this.notificationService.emit(res.message, 'success');
        }, error => {
            this.notificationService.emit('Invalid request could not be processed');
        })
      });
    });
    this.router.navigate(['home']);
  }
  acceptGroupInviteRequest() {

  }

}
