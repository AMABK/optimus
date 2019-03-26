import { Component, OnInit } from '@angular/core';
import { Chama } from '../../models/chama/chama';
import { Validators, FormControl } from '@angular/forms';
import { FormErrorService } from 'projects/form-error/src/public_api';
import { MatDialogRef } from '@angular/material';
import { AuthService } from 'projects/auth/src/public_api';
import { Observable } from 'rxjs';
import { NotificationService } from 'projects/notification/src/public_api';
import { ChamaService } from '../../http/chama/chama.service';

const emptyChama: Chama = {
  id: null,
  name: "",
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
export class RequestExitGroupComponent implements OnInit {
  chama$: Observable<Chama[]>;
  currentChama: Chama;
  activeButton: boolean = true;

  constructor(
    private notificationService: NotificationService,
    private chamaService: ChamaService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<RequestExitGroupComponent>
  ) {}

  name = new FormControl("", [Validators.required, Validators.minLength(4)]);
  address = new FormControl("", [Validators.required, Validators.minLength(4)]);
  location = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);
  desc = new FormControl("", [Validators.required, Validators.minLength(4)]);

  matcher = new FormErrorService();

  ngOnInit() {}
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
    this.chamaService.create(chama).subscribe(
      response => {
        this.closeRequestExitGroupDialog();
        this.notificationService.emit("Chama successfully created!", "success");
        this.getChama();
        this.resetCurrentChama();
      },
      error => {}
    );
  }

  updateChama(chama) {
    this.chamaService.update(chama).subscribe(response => {
      this.notificationService.emit("Chama details saved!");
      this.getChama();
      this.resetCurrentChama();
    });
  }
  resetCurrentChama() {
    this.currentChama = emptyChama;
  }
  getChama() {
    this.chama$ = this.chamaService.all();
  }
  closeRequestExitGroupDialog(): void {
    this.dialogRef.close();
  }
}
