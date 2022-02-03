import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({

    username: new FormControl(''),
    password: new FormControl('')

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
