import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from 'projects/auth/src/public_api';
import { NotificationService } from 'projects/notification/src/public_api';
import { Auth } from './models/auth/auth';
import { LoaderService } from 'projects/loader/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Chama App';
  currentUser: Auth;
  menus = [
    {
      main: { label: 'Transactions', icon: 'credit_card' },
      sub: [
        { path: '/transactions', icon: 'credit_card', label: 'Transactions' },
        {
          path: '/transactions/deposit',
          icon: 'money',
          label: 'Deposits'
        },
        {
          path: '/transactions/payable',
          icon: 'money_off',
          label: 'Payables(Fines&Loans)'
        },
        {
          path: '/transactions/withdrawal',
          icon: 'zoom_out_map',
          label: 'Withdrawals/Debits'
        },
        {
          path: '/transactions/loan-request',
          icon: 'shopping_basket',
          label: 'Loan Requests'
        }
      ]
    },
    {
      main: { label: 'Admin', icon: 'build' },
      sub: [
        { path: '/admin/users', icon: 'person', label: 'Manage Users' },
        { path: '/admin/groups', icon: 'group_work', label: 'Manage Groups' }
      ]
    },
    {
      main: { label: 'System Admin', icon: 'settings' },
      sub: [
        {
          path: '/admin/system/users',
          icon: 'assignment_ind',
          label: 'Manage System Users'
        },
        {
          path: '/admin/system/groups',
          icon: 'supervisor_account',
          label: 'Manage System Groups'
        }
      ]
    }
  ];
  links = [
    { path: '/home', icon: 'home', label: 'Your Home' },
    { path: '/transactions', icon: 'credit_card', label: 'Transactions' },
    { path: '/transactions/deposit', icon: 'money', label: 'Deposits' },
    {
      path: '/transactions/payable',
      icon: 'money_off',
      label: 'Payables(Fines&Loans)'
    },
    {
      path: '/transactions/withdrawal',
      icon: 'zoom_out_map',
      label: 'Withdrawals/Debits'
    },
    {
      path: '/transactions/debit-request',
      icon: 'settings_ethernet',
      label: 'Debit Requests'
    },
    { path: '/disputes', icon: 'flare', label: 'Disputes' },
    { path: '/insights', icon: 'pie_chart', label: 'Insights' },
    { path: '/admin', icon: '', label: 'Administration' },
    { path: '/admin/users', icon: 'person', label: 'Manage Users' },
    { path: '/admin/groups', icon: 'group_work', label: 'Manage Groups' },
    {
      path: '/admin/system/users',
      icon: 'assignment_ind',
      label: 'Manage System Users'
    },
    {
      path: '/admin/system/groups',
      icon: 'supervisor_account',
      label: 'Manage System Groups'
    }
  ];

  constructor(
    public loaderService: LoaderService,
    private ns: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit() {
    if (this.loaderService.isLoading.getValue()) {
      // console.log(this.loaderService.isLoading.getValue());
    } else {
      //console.log(this.loaderService.isLoading.getValue());
    }
  }

  logout($event) {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  prepareRouterState(router: RouterOutlet) {
    return router.activatedRouteData['animation'] || 'initial';
  }

  isSidenaveOpen(component, authentication) {
    if (authentication) {
      return true;
    }

    return component.opened && authentication;
  }
}
