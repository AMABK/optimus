import { NgModule } from '@angular/core';
import { FormErrorComponent } from './form-error.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';

@NgModule({
  declarations: [FormErrorComponent],
  imports: [
  ],
  exports: [FormErrorComponent],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ]
})
export class FormErrorModule { }
