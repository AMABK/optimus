import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
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
import { AuthService } from 'projects/auth/src/public_api';
import { Router } from '@angular/router';
import { MessageService } from '../../http/message/message.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  checked = false;
  inbox = 'inbox';
  outbox = 'outbox';
  selectAllStatus;
  newMessage = false;
  sentMessages = false;
  mailThread = false;
  subTitle = '';
  tabNo = 1;
  @Output() selectedTabChange: EventEmitter<MatTabChangeEvent>;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  userCtrl = new FormControl();
  filteredusers: Observable<string[]>;
  users: string[] = [];
  allusers: string[] = [];
  search = '';
  @ViewChild('userInput', { static: false }) userInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;
  private searchTerm$ = new Subject<any>();
  hasUsers = true;
  messageId;
  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private notificationService: NotificationService,
    private authService: AuthService) {
    this.authService.currentUser.subscribe(x => {
      if (x !== null) {
        this.searchChamaUserEmails();
      }
    });
    this.filteredusers = this.userCtrl.valueChanges.pipe(
      // tslint:disable-next-line: deprecation
      startWith(null),
      map((user: string | null) => user ? this._filter(user) : this.allusers.slice()));
  }
  // tslint:disable-next-line: variable-name
  thread_id = new FormControl('new', [Validators.required]);
  message = new FormControl('', [Validators.required]);
  // tslint:disable-next-line: variable-name
  chama_id = new FormControl(this.authService.getUserData().user.chama_id, [Validators.required]);
  matcher = new FormErrorService();
  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  handleSearch(query: string, model: string) {
    switch (model) {
      case 'search':
        this.search = query;
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
      if (this.chama_id.value !== 'number') {
      }
      const message = {
        users: this.users,
        message: this.message.value ,
        thread_id: this.thread_id.value
      };
      this.subscription.add(this.messageService.createMessage(message).subscribe(response => {
        this.newMessage = false;
        this.notificationService.emit('Message successfully sent', 'success');
      },
        error => {

        })
      );
    }
  }
  searchChamaUserEmails() {
    this.subscription.add(this.userService
      .searchChamaUserEmails(0,this.searchTerm$)
      .subscribe(response => {
        console.log(response.data.data)
        this.allusers = response.data;
        this.allusers = this.allusers.filter((el) => !this.users.includes(el));

      }));
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
    // validate input is email
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    // Only add if email does not already exist
    const isEmail = event.option.viewValue.match(pattern);
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
    if (this.checked === true) {
      this.selectAllStatus = false;
    }
    // console.log(this.selectAllStatus)
    this.checked = false;

  }
  checkAll() {
    this.checked = !this.checked;
    if (this.checked === true) {
      this.selectAllStatus = null;
    }
  }
  composeMessage() {
    this.newMessage = !this.newMessage;
    if (this.newMessage === true) {
      this.mailThread = false;
      this.subTitle = '>> New Message';
    } else {
      this.subTitle = '';
    }
    if (this.newMessage === true) {
      this.searchChamaUserEmails();
    }
  }
  backToNotifications() {
    this.subTitle = '';
    this.newMessage = false;
    this.mailThread = false;
    if (this.checked === true) {
      this.selectAllStatus = false;
    }
    this.checked = false;
  }
  recallSentMessage() {
    this.sentMessages = !this.sentMessages;
  }
  messageIdHandler(messageId) {
    this.mailThread = true;
    if (this.mailThread === true) {
      this.subTitle = '>> Message Thread';
    } else {
      this.subTitle = '';
    }
    this.messageId = messageId;
  }
}
