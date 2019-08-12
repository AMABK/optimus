import { Component, OnInit, Input, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription, Subject} from 'rxjs';
import { UserService } from '../../http/user/user.service';
import * as moment from 'moment';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AuthService } from 'projects/auth/src/public_api';
import { MessageService } from '../../http/message/message.service';

@Component({
  selector: 'app-list-messages',
  templateUrl: './list-messages.component.html',
  styleUrls: ['./list-messages.component.css']
})
export class ListMessagesComponent implements OnInit, OnDestroy {
  @Input() messageType;
  @Input() checked;
  subscription: Subscription = new Subscription();
  searchTerm$ = new Subject<any>();
  paginationData: any;
  asAdmin = "no";
  pFromDate = "";
  download = "";
  pToDate: string = "";
  sFromDate: string = "";
  sToDate: string = "";
  search: string = "";
  verified: string = "";
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageEvent: PageEvent;
  @Output() msg_Id: EventEmitter<number> = new EventEmitter();
  constructor( private messageService: MessageService, private authService: AuthService) { }
  messages;

  ngOnInit() {
    this.getChamaUserMessages();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  handleSearch(query: string, model: string) {
    switch (model) {
      case "search":
        // General search can only be done in exclusivity
        this.clearSearch();
        this.search = query;
        break;
      case "pFromDate":
        this.search = "";
        this.pFromDate = query;
        break;
      case "download":
        this.download = 'download';
        break;
      case "pToDate":
        this.search = "";
        this.pToDate = query;
        break;
      case "sFromDate":
        this.search = "";
        this.sFromDate = query;
        break;
      case "sToDate":
        this.search = "";
        this.sToDate = query;
        break;
      case "verified":
        this.search = "";
        this.verified = query;
        break;
      case "messageType":
        this.search = "";
        this.messageType = query;
        break;
      default:
        break;
    }
    this.pFromDate = query === "" ? "" : this.formatDateInput(this.pFromDate);
    this.pToDate = query === "" ? "" : this.formatDateInput(this.pToDate);
    this.sFromDate = query === "" ? "" : this.formatDateInput(this.sFromDate);
    this.sToDate = query === "" ? "" : this.formatDateInput(this.sToDate);
    this.searchTerm$.next({
      q: this.search,
      pFromDate: this.pFromDate,
      pToDate: this.pToDate,
      sFromDate: this.sFromDate,
      sToDate: this.sToDate,
      verified: this.verified,
      messageType: this.messageType,
    });
    this.paginator.pageIndex = 0;
  }
  clearSearch(activate = null) {
    this.pFromDate = "";
    this.pToDate = "";
    this.sFromDate = "";
    this.sToDate = "";
    this.verified = "";
    this.search = "";
    if (activate === "activate") {
      this.handleSearch("", "");
    }
  }
  paginate($event) {
    this.pageEvent = $event;
    const pageIndex = this.pageEvent.pageIndex;
    const pageSize = this.pageEvent.pageSize;
    const query = this.search;
    const pFromDate =
      this.pFromDate === "" ? "" : this.formatDateInput(this.pFromDate);
    const pToDate =
      this.pToDate === "" ? "" : this.formatDateInput(this.pToDate);
    const sFromDate =
      this.sFromDate === "" ? "" : this.formatDateInput(this.sFromDate);
    const sToDate =
      this.sToDate === "" ? "" : this.formatDateInput(this.sToDate);
    const verified = this.verified;
    this.searchTerm$.next({
      q: query,
      pFromDate,
      pToDate,
      sFromDate,
      sToDate,
      verified,
      messageType: this.messageType,
      page: pageIndex + 1,
      size: pageSize
    });
  }
  formatDateInput(date) {
    if (date === "" || date == null) {
      return "";
    }
    const momentDate = new Date(date); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format("YYYY-MM-DD");
    return formattedDate;
  }
  getChamaUserMessages() {
    this.subscription.add(this.messageService
      .searchChamaUserMessages(this.messageType, this.searchTerm$)
      .subscribe(response => {
        console.log(response)
        this.messages = response.data.data;
      }))
  }
  getUserMessageStatus(user_messages) {
    for (let user_message of user_messages) {
      if (user_message.id == this.authService.getUserId()) {
        console.log(user_message)
        switch (user_message.pivot.status) {
          case 0:
            return 'email';
            break;
          case 1:
            return 'check_circle_outline';
            break;
          default:
            return 'error'
        }
      }
    }
    return 'error';
  }
  changeMessageStatus(messageId, status, messageType) {
    this.msg_Id.emit(messageId);
    if (messageType == 'inbox') {
      const message = {
        status,
        message_id: messageId,
        user_id: this.authService.getUserId()
      }
      this.messageService.changeMessageStatus(message).subscribe(res => {
        this.getChamaUserMessages();
      }, error => { });
    }
  }

}
