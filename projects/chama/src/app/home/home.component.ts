import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AuthService } from 'projects/auth/src/public_api';
import { MatDialog } from '@angular/material';
import { AddGroupDetailsComponent } from './add-group-details/add-group-details.component';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RequestExitGroupComponent } from './request-exit-group/request-exit-group.component';
import { InviteGroupMembersComponent } from './invite-group-members/invite-group-members.component';
import { ChamaService } from '../http/chama/chama.service';
import { Chama } from 'src/app/models/chama';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { NotificationService } from 'projects/notification/src/public_api';
import { User } from '../models/user/user';
import { AddGroupPaymentDetailsComponent } from './add-group-payment-details/add-group-payment-details.component';
import { AddGroupContributionTypeComponent } from './add-group-contribution-type/add-group-contribution-type.component';
import { LoaderInterceptorService } from 'projects/loader-interceptor/src/public_api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(AddGroupDetailsComponent) child;
  responseStatus: string = '';
  contributionColumns: string[] = ['position', 'amount', 'type', 'date', 'verified'];
  chamas$: Observable<Chama>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  defaultGroup: any;
  editGroup = true;
  user$: Observable<User>;
  displayedColumns: string[] = ['name', 'address', 'default', 'request'];
  user: any = {
    id: null
  };
  private chamaSubject: BehaviorSubject<User>;
  public chama: Observable<User>;

  constructor(
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private chamaService: ChamaService,
    private authService: AuthService,
    private loaderIService: LoaderInterceptorService
  ) {
    //this.getDefaultChamaDetails();
  }
  ngAfterViewInit() {
    // this.responseStatus = this.child.responseStatus;
    this.getDefaultChamaDetails();
  }
  ngOnInit() {
    this.getDefaultChamaDetails();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.chamas$ = this.getChamas(this.authService.getUserId());
    this.getDefaultChamaDetails();
  }
  getChamas(userId) {
    const url = environment.apiUrl + '/api/chama?user_id=' + userId;
    return this.chamaService.all(url);
  }
  getDefaultChamaDetails() {
    this.chamaService.getDefaultChamaDetails().subscribe(result => {
      // update default chama
      let authData = this.authService.getUserData();
      authData.user.chama_id = result.chama_id;
      if (authData.user.chama_id === null) {
        if (result.chama_id != null) {
          authData.user.default_chama = {
            id: result.chama_id,
            name: result.default_chama.name
          };
        } else {
          authData.user.default_chama = {};
        }
      } else {
        if(result.chama_id == null){
          authData.user.default_chama = {};
        }else{
        authData.user.default_chama.name = result.default_chama.name;
        }
      }
      this.authService.storeResult(authData);

      this.chamaSubject = new BehaviorSubject<User>(result);
       this.user = this.chamaSubject.value;
      this.chama = this.chamaSubject.asObservable();
    });
  }
  updateDefaultChama(chamaId) {
    let currentChamaId = this.authService.getUserData().user.chama_id;
    // allow change only if the chama id has changed
    if (currentChamaId != chamaId) {
      this.defaultGroup = this.chamaService
        .updateDefaultChama(chamaId)
        .subscribe(result => {
          this.getDefaultChamaDetails();
        });
      // this.chama$ = this.getChamas(this.authService.getUserId());
    }
  }
  ngOnDestroy() {
    this.defaultGroup;
  }
  openAddGroupDetails() {
    this.chamaService.getDefaultChamaDetails().subscribe(result => {
      let modalData = {};
      if (result.default_chama == null) {
        modalData = {
          id: null,
          name: '',
          address: '',
          phone_number: '',
          email: '',
          location: '',
          description: ''
        };
      } else {
        modalData = result.default_chama;
      }

      const dialogRef = this.dialog.open(AddGroupDetailsComponent, {
        height: 'auto',
        width: '600px',
        data: {
          key: modalData
        }
      });
      dialogRef.afterClosed()
        .subscribe(result => {
          if (result === 'success') {
            this.chamas$ = this.getChamas(this.authService.getUserId());
            this.getDefaultChamaDetails();
            // set message to be emitted by loader interceptor after http requests end
            this.loaderIService.storeNotificationMessage('Chama successfully updated!', 'success');
          }
        });
    });
  }
  openAddGroupContributionTypes() {
    let defaultChama = this.authService.getUserData().user.default_chama;


    const dialogRef = this.dialog.open(AddGroupContributionTypeComponent, {
      height: 'auto',
      width: '600px',
      data: {
        key: defaultChama
      }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result === 'success') {
          this.chamas$ = this.getChamas(this.authService.getUserId());
          this.getDefaultChamaDetails();
          this.loaderIService.storeNotificationMessage('Contribution type successfully added', 'success');
        }
      });
  }

  openRequestExitGroupDialog() {
    const dialogRef = this.dialog.open(RequestExitGroupComponent, {
      height: 'auto',
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openInviteGroupMembersDialog() {
    const dialogRef = this.dialog.open(InviteGroupMembersComponent, {
      height: 'auto',
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  openAddPaymentDetails() {
    const result = {
      modal: 'Add',
      bank: '',
      country: '',
      description: ''
    };
    const dialogRef = this.dialog.open(AddGroupPaymentDetailsComponent, {
      height: 'auto',
      width: '600px',
      data: {
        key: result
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.chamas$ = this.getChamas(this.authService.getUserId());
      this.getDefaultChamaDetails();
      if (result == 'success') {
        // set message to be emitted by loader interceptor after http requests end
        this.loaderIService.storeNotificationMessage('Payment method successfully added', 'success');
      }
    });
  }
  openEditPaymentDetails(payment, chamaName) {
    payment.chamaName = chamaName;
    payment.modal = 'Edit';
    const dialogRef = this.dialog.open(AddGroupPaymentDetailsComponent, {
      height: 'auto',
      width: '600px',
      data: {
        key: payment
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.chamas$ = this.getChamas(this.authService.getUserId());
      this.getDefaultChamaDetails();
      // console.log(`Dialog result: ${result}`);
    });
  }
  tabPosition(key) {
    const position = Number(key) + 1;
    return position;
  }
}
