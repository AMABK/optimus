import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar: MatSnackBar) {
  }

  // Second parameter sets background color
  emit(notification, status= 'danger') {
    this.snackbar.open(notification, 'OK', { duration: 3000, panelClass: [status +'-snackbar'], verticalPosition: 'top' });
  }
}
