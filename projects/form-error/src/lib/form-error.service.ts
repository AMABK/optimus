import { Injectable } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, NgForm, FormGroupDirective, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormErrorService implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective| NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
