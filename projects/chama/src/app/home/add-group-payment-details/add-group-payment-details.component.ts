import { Component, OnInit, Output, EventEmitter, Inject, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Chama } from '../../models/chama/chama';
import { NotificationService } from 'projects/notification/src/public_api';
import { ChamaService } from '../../http/chama/chama.service';
import { AuthService } from 'projects/auth/src/public_api';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddGroupDetailsComponent } from '../add-group-details/add-group-details.component';
import { FormControl, Validators } from '@angular/forms';
import { FormErrorService } from 'projects/form-error/src/public_api';
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
  updatedAt: ''
};

@Component({
  selector: "app-add-group-payment-details",
  templateUrl: "./add-group-payment-details.component.html",
  styleUrls: ["./add-group-payment-details.component.css"]
})
export class AddGroupPaymentDetailsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  list = [
    { value: "0", viewValue: "Active " },
    { value: "1", viewValue: "In Active" }
  ];
  public tools: object = {
    items: [
      "Bold",
      "Italic",
      "Underline",
      "StrikeThrough",
      "|",
      "FontName",
      "FontSize",
      "FontColor",
      "BackgroundColor",
      "|",
      "LowerCase",
      "UpperCase",
      "|",
      "Undo",
      "Redo",
      "|",
      "Formats",
      "Alignments",
      "|",
      "OrderedList",
      "UnorderedList",
      "|",
      "Indent",
      "Outdent",
      "|",
      "CreateLink",
      "CreateTable",
      "Image",
      "|",
      "ClearFormat",
      "Print",
      "SourceCode",
      "|",
      "FullScreen"
    ]
  };

  chamas$: Observable<Chama>;
  paymentDetails: {};
  activeButton = true;
  countries$: Observable<any>;
  @Output() updateEvent = new EventEmitter<Chama>();
  constructor(
    private notificationService: NotificationService,
    private chamaService: ChamaService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<AddGroupDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  id = new FormControl(this.data.key.id, []);
  // tslint:disable-next-line: variable-name
  chama_id = new FormControl(this.data.key.chama_id, []);
  bank = new FormControl(this.data.key.bank, [Validators.required]);
  account = new FormControl(this.data.key.account_no, [Validators.required]);
  status = new FormControl('', [Validators.required]);
  country = new FormControl(this.data.key.country, [
    Validators.required,
    Validators.minLength(2)
  ]);
  description = new FormControl(this.data.key.description, [
    Validators.required,
    Validators.minLength(4)
  ]);

  matcher = new FormErrorService();

  ngOnInit() {
    this.authService.getCountryJSON().subscribe(res => {
      this.countries$ = res;
    });
    //alert(JSON.stringify(this.data.key));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  registerChama(form) { }

  onSubmit() {
    if (
      this.bank.valid &&
      this.country.valid &&
      this.account.valid &&
      this.description.valid &&
      this.status.valid
    ) {
      this.paymentDetails = {
        id: this.data.key.id,
        bank: this.bank.value,
        account_no: this.account.value,
        chama_id: this.chama_id.value,
        country: this.country.value,
        status: this.status.value,
        description: this.description.value
      };

      this.saveChamaPaymentMode(this.paymentDetails);
    }
  }

  saveChamaPaymentMode(paymentMode) {
    if (!paymentMode.id) {
      this.createChamaPaymentMode(paymentMode);
    } else {
      this.updateChamaPaymentMode(paymentMode);
    }
  }
  createChamaPaymentMode(paymentMode) {
    this.subscription.add(this.chamaService.createPaymentMode(paymentMode).subscribe(
      response => {
        this.dialogRef.close("success");
      },
      error => {
        this.notificationService.emit("Payment mode creation failed!");
      }
    ));
  }
  closeAddGroupPaymentDialog(): void {
    this.dialogRef.close();
  }
  updateChamaPaymentMode(chama) {
    this.subscription.add(this.chamaService.updatePaymentMode(chama).subscribe(
      response => {
        this.dialogRef.close("success");
        this.getChama();
      },
      error => {
        this.notificationService.emit("Chama payment creation failed!");
      }
    ));
  }

  getChama() {
    let url = environment.apiUrl + "/api/chama";
    this.chamas$ = this.chamaService.all(url);
  }
}
