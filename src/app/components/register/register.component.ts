import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InputValidators } from 'src/app/validators/input.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  validators: InputValidators = new InputValidators();

  registerForm = new FormGroup({

    username: new FormControl('', [Validators.required, Validators.minLength(4), this.validators.usernameValidator]),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')

  });

  constructor() { }

  ngOnInit(): void {
  }

  submitForm(): void{
    console.warn(this.registerForm.value);
  }

  resetForm(): void{
    console.warn('reset form');
  }

}
