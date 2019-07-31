import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Subscription, Subject } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { startWith, map } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { UserService } from '../../http/user/user.service';
import { FormErrorService } from 'projects/form-error/src/public_api';
import { NotificationService } from 'projects/notification/src/public_api';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  subscription: Subscription = new Subscription();
  checked = false;
  selectAllStatus;
  newMessage = false;
  sentMessages = false;
  subTitle = "";
  tabNo = 1;
  @Output() selectedTabChange: EventEmitter<MatTabChangeEvent>

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl();
  filteredusers: Observable<string[]>;
  users: string[] = [];
  allusers: string[] = [];
  search = "";
  @ViewChild('userInput', { static: false }) userInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  searchTerm$ = new Subject<any>();
  hasUsers = true;
  constructor(private userService:UserService, private notificationService: NotificationService) {
    this.filteredusers = this.userCtrl.valueChanges.pipe(
      startWith(null),
      map((user: string | null) => user ? this._filter(user) : this.allusers.slice()));
  }
  message = new FormControl("", [Validators.required]);
  matcher = new FormErrorService();
  ngOnInit() {
  }
  handleSearch(query: string, model: string) {
    switch (model) {
      case "search":
        this.search = query
        break;
    }
    this.searchTerm$.next({
      q: this.search
    });
  }
  onSendNewMessage() {
    if (this.users.length < 1) {
      this.hasUsers = false;
    } else {
      this.hasUsers = true;
      const message = {
        'users': this.users,
        'message': this.message.value 
      }
      this.subscription.add(this.userService.createMessage(message).subscribe(response => {
        this.newMessage = false;
        this.notificationService.emit('Message successfully sent', 'success');
      },
        error => {
          this.notificationService.emit('Message could not be sent. Ensure you have added correct email addresses before sending', 'warning',10000);

        })
      );
    }
  }
  getChamaUsers() {
    this.subscription.add(this.userService
      .searchChamaUser(this.searchTerm$)
      .subscribe(response => {
        this.allusers = response.data;
        this.allusers = this.allusers.filter((el) => !this.users.includes(el));

      }))
  }

  add(event: MatChipInputEvent): void {
    // Add user only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our user
      if ((value || '').trim()) {
        this.users.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.userCtrl.setValue(null);
    }
  }

  remove(user: string): void {
    const index = this.users.indexOf(user);

    if (index >= 0) {
      this.users.splice(index, 1);
    }
    
    if (this.users.length < 1) {
      this.hasUsers = false;
    } else {
      this.hasUsers = true;
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    //validate input is email
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    //Only add if email does not already exist
    let isEmail = event.option.viewValue.match(pattern)
    if (!this.users.includes(event.option.viewValue)) {
      this.users.push(event.option.viewValue);
      this.userInput.nativeElement.value = '';
    }
    this.userCtrl.setValue(null);
    if (this.users.length < 1) {
      this.hasUsers = false;
    } else {
      this.hasUsers = true;
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allusers.filter(user => user.toLowerCase().indexOf(filterValue) === 0);
  }
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    if (this.checked == true) {
      this.selectAllStatus = false;
    }
    //console.log(this.selectAllStatus)
    this.checked = false;

  }
  checkAll() {
    this.checked = !this.checked;
    if (this.checked == true) {
      this.selectAllStatus = null;
    }
  }
  composeMessage() {
    this.newMessage = !this.newMessage;
    if (this.newMessage == true) {
      this.subTitle = ">> New Message";
    } else {
      this.subTitle = "";
    }
    if (this.newMessage == true) {
      this.getChamaUsers();
    }
  }
  recallSentMessage() {
    this.sentMessages = !this.sentMessages;
  }
}
