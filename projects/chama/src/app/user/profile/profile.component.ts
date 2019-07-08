import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormErrorService } from 'projects/form-error/src/public_api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  firstName = new FormControl('', [
    Validators.required,
    Validators.minLength(4)]
  );

  matcher = new FormErrorService();
  ngOnInit() {
  }
  onSubmit() {
    
  }

}
