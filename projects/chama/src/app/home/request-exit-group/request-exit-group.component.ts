import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chama } from '../../models/chama/chama';
import { Validators, FormControl } from '@angular/forms';
import { FormErrorService } from 'projects/form-error/src/public_api';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'projects/auth/src/public_api';
import { Observable, Subscription } from 'rxjs';
import { NotificationService } from 'projects/notification/src/public_api';
import { ChamaService } from '../../http/chama/chama.service';
import { environment } from 'projects/chama/src/environments/environment';

const emptyChama: Chama = {
  id: null,
  name: "",
  email: '',
  phoneNumber:'',
  address: "",
  location: "",
  description: "",
  createdBy: null,
  status: null,
  createdAt: "",
  updatedAt: ""
};
@Component({
  selector: "app-request-exit-group",
  templateUrl: "./request-exit-group.component.html",
  styleUrls: ["./request-exit-group.component.css"]
})
export class RequestExitGroupComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  chama$: Observable<Chama>;
  currentChama: Chama;
  activeButton: boolean = true;

  constructor(
    private notificationService: NotificationService,
    private chamaService: ChamaService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<RequestExitGroupComponent>
  ) {}

  name = new FormControl("", [Validators.required, Validators.minLength(4)]);
  email = new FormControl("", [Validators.email, Validators.minLength(4)]);
  phoneNumber = new FormControl("", [Validators.required, Validators.minLength(4)]);
  address = new FormControl("", [Validators.required, Validators.minLength(4)]);
  location = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);
  desc = new FormControl("", [Validators.required, Validators.minLength(4)]);

  matcher = new FormErrorService();

  ngOnInit() { }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  registerChama(form) {
    //console.log(form.value);
  }

  onSubmit() {
    if (
      this.name.valid &&
      this.address.valid &&
      this.location.valid &&
      this.desc.valid
    ) {
      this.currentChama = {
        name: this.name.value,
        email: this.email.value,
        phoneNumber: this.phoneNumber.value,
        address: this.address.value,
        location: this.location.value,
        description: this.desc.value,
        createdBy: this.authService.getUserData()["user"]["id"],
        status: 0
      };

      this.saveChama(this.currentChama);
    }
  }

  saveChama(chama) {
    if (!chama.id) {
      this.createChama(chama);
    } else {
      this.updateChama(chama);
    }
  }
  createChama(chama) {
    this.subscription.add(this.chamaService.create(chama).subscribe(
      response => {
        this.closeRequestExitGroupDialog();
        this.getChama();
        this.resetCurrentChama();
      },
      error => {}
    ));
  }

  updateChama(chama) {
    this.subscription.add(this.chamaService.update(chama).subscribe(response => {
      this.getChama();
      this.resetCurrentChama();
      this.notificationService.emit("Chama details saved!");
    }));
  }
  resetCurrentChama() {
    this.currentChama = emptyChama;
  }
  getChama() {
    this.chama$ = this.chamaService.all(
      environment.apiUrl + "/api/chama?user=1"
    );
  }
  closeRequestExitGroupDialog(): void {
    this.dialogRef.close();
  }
}
