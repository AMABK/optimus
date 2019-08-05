import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { duration } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar: MatSnackBar) {
  }

  // Second parameter sets background color
  emit(notification: string, status = 'danger', duration = 5000) {
    this.snackbar.open(notification, 'OK', { duration: duration, panelClass: [status +'-snackbar'], verticalPosition: 'top' });
  }
}
