import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../http/user/user.service';
import { NotificationService } from 'projects/notification/src/public_api';
import { environment } from '../../environments/environment';
import { AuthService } from 'projects/auth/src/public_api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  code = null;
  activationCode = null;
  email = null;
  activationEmail = null;
  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(urlParams => {
      this.code = urlParams.get("code")
      this.activatedRoute.queryParams.subscribe(queryParams => {
        this.email = queryParams['email'];

        this.activationCode = urlParams.get("activationCode");
        this.activationEmail = urlParams.get("email");
        if (this.activationCode != '') {
          const account = {
            apiUrl: environment.apiUrl,
            activation_code: this.activationCode,
            email: this.activationEmail
          }
          this.activateAccount(account);
        }

        if (this.code != null) {
          const request = {
            email: this.email,
            code: this.code
          }
          this.acceptGroupInviteRequest(request);
        }
      });
    });
    this.router.navigate(['home']);
  }
  acceptGroupInviteRequest(request) {
    this.userService.acceptGroupInviteRequest(request).subscribe(res => {
      this.notificationService.emit(res.message, 'success');
    }, error => {
      this.notificationService.emit('Invalid request could not be processed');
    });
    this.router.navigate(['home']);
  }
  activateAccount(account) {
    this.authService.activateAccount(account).subscribe(res => {
      this.notificationService.emit('Account activated!', 'success')
      this.authService.logout();
      this.router.navigate(['login']);
    }, error => {
      this.notificationService.emit('Account activation failed, invalid url')
    })
  }
}
