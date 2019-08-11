import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'projects/auth/src/public_api';
import { FormControl, Validators } from '@angular/forms';
import { FormErrorService } from 'projects/form-error/src/public_api';
import { AddGroupDetailsComponent } from '../../home/add-group-details/add-group-details.component';
import { Router } from '@angular/router';
import { ChamaService } from '../../http/chama/chama.service';
import { LoaderInterceptorService } from 'projects/loader-interceptor/src/public_api';
import { NotificationService } from 'projects/notification/src/public_api';

@Component({
  selector: 'app-request-join-group',
  templateUrl: './request-join-group.component.html',
  styleUrls: ['./request-join-group.component.css']
})
export class RequestJoinGroupComponent implements OnInit {

  constructor(private notificationService: NotificationService, private loaderIService: LoaderInterceptorService, private dialog:MatDialog, private chamaService: ChamaService, private router: Router, private authService: AuthService, public dialogRef: MatDialogRef<RequestJoinGroupComponent>, public addGroup: MatDialogRef<AddGroupDetailsComponent>) { }
  matcher = new FormErrorService;
  code = new FormControl("", [Validators.required]);
  ngOnInit() {

    
  }
  onSubmit() {
    if (this.code.valid) {
      const invite = {
        code:this.code.value
      }
      this.chamaService.joinGroupByInviteCode(invite).subscribe(res => {
        this.notificationService.emit('Successfully joined group', 'success')
        this.dialogRef.close('success');
      }, error => {
          let msg;
          if (error.error.message == null) {
             msg = 'Some error occured';
          } else {
            msg = error.error.message;
          }
        this.notificationService.emit(msg, 'danger')
      })
    } else {
      console.log('log')
    }
  }
  closeRequestJoinGroup(){
    this.dialogRef.close();
    this.router.navigate(['home'], { queryParams: { addGroup: 'success' } });
    this.openAddGroupDetails();
  }
  openAddGroupDetails(status = 'create') {
    this.chamaService.getDefaultChamaDetails().subscribe(result => {
      let modalData = {};
      // alert(result)
      if ((result.default_chama == null) || (status == 'create')) {
        modalData = {
          id: null,
          name: "",
          address: "",
          phone_number: "",
          email: "",
          location: "",
          description: ""
        };
      } else {
        modalData = result.default_chama;
      }
      const dialogRef1 = this.dialog.open(AddGroupDetailsComponent, {
        height: "auto",
        width: "600px",
        data: {
          key: modalData
        }
      });
      dialogRef1.afterClosed().subscribe(result => {
        if (result === "success") {
          // this.chamas$ = this.getChamas(this.authService.getUserId());
          //this.getDefaultChamaDetails();
          this.router.navigate(['home']);
          // set message to be emitted by loader interceptor after http requests end
          this.loaderIService.storeNotificationMessage(
            "Chama successfully updated!",
            "success"
          );
        }
      });
    });
  }

}
