import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { ChamaService } from '../../http/chama/chama.service';
import { Chama } from '../../models/chama/chama';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { FormErrorService } from 'projects/form-error/src/public_api';
import { AuthService } from 'projects/auth/src/public_api';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'projects/chama/src/environments/environment';


const emptyChama: Chama = {
  id: null,
  name: '',
  address: '',
  email: '',
  phoneNumber: '',
  location: '',
  description: '',
  createdBy: null,
  status: null,
  createdAt: '',
  updatedAt: '',
};
@Component({
  selector: 'app-add-group-details',
  templateUrl: './add-group-details.component.html',
  styleUrls: ['./add-group-details.component.css']
})
export class AddGroupDetailsComponent implements OnInit {
  responseStatus: string;
  chamas$: Observable<Chama>;
  currentChama: Chama;
  activeButton: boolean = true;
  @Output() updateEvent = new EventEmitter<Chama>();
  constructor(
    private chamaService: ChamaService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<AddGroupDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  id = new FormControl(this.data.key.id, []);
  name = new FormControl(this.data.key.name, [
    Validators.required,
    Validators.minLength(4)
  ]);
  email = new FormControl(this.data.key.email, [Validators.email]);
  phoneNumber = new FormControl(this.data.key.phone_number, [
    Validators.required,
    Validators.minLength(10)
  ]);
  address = new FormControl(this.data.key.address, [
    Validators.required,
    Validators.minLength(4)
  ]);
  location = new FormControl(this.data.key.location,[
    Validators.required,
    Validators.minLength(4)
  ]);
  desc = new FormControl(this.data.key.description, [
    Validators.required,
    Validators.minLength(4)]);

  matcher = new FormErrorService();

  ngOnInit() {
    //alert(JSON.stringify(this.data.key));
  }
  registerChama(form) {}

  onSubmit() {
    if (
      this.name.valid &&
      this.address.valid &&
      this.email.valid &&
      this.phoneNumber.valid &&
      this.location.valid &&
      this.desc.valid
    ) {
      this.currentChama = {
        id: this.id.value,
        name: this.name.value,
        email: this.email.value,
        phoneNumber: this.phoneNumber.value,
        address: this.address.value,
        location: this.location.value,
        description: this.desc.value,
        createdBy: this.authService.getUserData()['user']['id'],
        status: 0
      };

      this.saveChama(this.currentChama);
      let url =
        environment.apiUrl +
        '/api/chama?user_id=' +
        this.authService.getUserId();
      this.chamas$ = this.chamaService.all(url);
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
        this.dialogRef.close('success');
        //this.notificationService.emit('Chama successfully created!', 'success');
      },
      error => {}
    );
  }

  updateChama(chama) {
    return this.chamaService.update(chama).subscribe(response => {
      this.dialogRef.close('success');
    });
  }
  resetCurrentChama() {
    this.currentChama = emptyChama;
  }
  getChama() {
    let url = environment.apiUrl + '/api/chama';
    this.chamas$ = this.chamaService.all(url);
  }
  closeCreateGroupDialog(): void {
    this.dialogRef.close();
  }
}
