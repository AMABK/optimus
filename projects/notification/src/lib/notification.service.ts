import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar: MatSnackBar) {
  }

  emit(notification) {
    this.snackbar.open(notification, 'OK', { duration: 3000 });
  }
}
