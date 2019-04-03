import { Component, OnInit, Input } from '@angular/core';
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

const ELEMENT_DATA = [
  { position: 1, name: 'Royals Self Help Group', weight: '21st Nov,', symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  chamas$: Observable<Chama>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  defaultGroup: any;
  editGroup = true;
  user$: Observable<User>;
  displayedColumns: string[] = ["name", "address", "default", "request"];
  private chamaSubject: BehaviorSubject<User>;
  public chama: Observable<User>;
  constructor(
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private chamaService: ChamaService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) { 
    this.getDefaultChamaDetails();
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required]
    });
    this.chamas$ = this.getChamas(this.authService.getUserId());
    //this.getDefaultChamaDetails();
  }
  getChamas(userId) {
    let url = environment.apiUrl + "/api/chama?user_id=" + userId;
    return this.chamaService.all(url);
  }
  getDefaultChamaDetails() {
    this.chamaService.getDefaultChamaDetails().subscribe(result => {
      this.chamaSubject = new BehaviorSubject<User>(result);
      this.chama = this.chamaSubject.asObservable();
      //alert(JSON.stringify(this.chama));
    });
  }
  updateDefaultChama(chamaId) {
    this.defaultGroup = this.chamaService
      .updateDefaultChama(chamaId)
      .subscribe(result => {
        this.getDefaultChamaDetails();
        this.notificationService.emit(
          "Default chama successfully updated",
          "success"
        );
      });
   // this.chama$ = this.getChamas(this.authService.getUserId());
  }
  ngOnDestroy() {
    this.defaultGroup.unsubscribe();
  }
  openAddGroupDetails() {
    
    this.chamaService.getDefaultChamaDetails().subscribe(result => {
      const dialogRef = this.dialog.open(AddGroupDetailsComponent, {
        height: "auto",
        width: "600px",
        data: {
          key: result.default_chama
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.chamas$ = this.getChamas(this.authService.getUserId());
        //console.log(`Dialog result: ${result}`);
      });
    });
  }

  openRequestExitGroupDialog() {
    const dialogRef = this.dialog.open(RequestExitGroupComponent, {
      height: "auto",
      width: "600px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openInviteGroupMembersDialog() {
    const dialogRef = this.dialog.open(InviteGroupMembersComponent, {
      height: "auto",
      width: "600px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
