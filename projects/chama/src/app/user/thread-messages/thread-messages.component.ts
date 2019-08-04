import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { MessageService } from '../../http/message/message.service';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'projects/auth/src/public_api';
import { NotificationService } from 'projects/notification/src/public_api';
import { FormErrorService } from 'projects/form-error/src/public_api';

@Component({
  selector: 'app-thread-messages',
  templateUrl: './thread-messages.component.html',
  styleUrls: ['./thread-messages.component.css']
})
export class ThreadMessagesComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  panelOpenState = false;
  @Input() messageId;
  messageThread$: Observable<any>;
  currentUserId
  default_message = "";
  displayedColumns: string[] = ['message', 'created_at'];
  constructor(private messageService: MessageService,private notificationService:NotificationService, private authService: AuthService) { }
  message = new FormControl("", [Validators.required]);
  thread_id = new FormControl("", [Validators.required]);
  matcher = new FormErrorService();

  ngOnInit() {
    console.log('run')
    this.currentUserId = this.authService.getUserId();
    this.getThreadMessages();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  getThreadMessages() {
    this.subscription.add(
      this.messageService.getThreadMessages(this.messageId).subscribe(res => {
        this.messageThread$ = res.data;
        console.log('this.messageThread$')
      }, error => {

      })
    )
  }
  onSendReplyMessage() {
    const message = {
      thread_id: this.thread_id.value,
      message_id: this.messageId,
      message: this.message.value,
      user_id: this.authService.getUserId()
    }
    console.log(message)
    this.messageService.onSendReplyMessage(message).subscribe(res => {
      this.message.setValue('');
      this.getThreadMessages();
      this.notificationService.emit('Reply sent','success')
    }, error => { })

  }
}
