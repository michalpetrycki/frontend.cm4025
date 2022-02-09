import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LoginUser } from 'src/app/models/interfaces/login-user.interface';
import { InputValidators } from 'src/app/validators/input.validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  validators: InputValidators = new InputValidators();

  loginForm = new FormGroup({

    usernameOrEmail: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30), this.validators.usernameValidator]),
    password: new FormControl('', [Validators.required]),
        
  });

  get passwordControl(): AbstractControl{
    return this.loginForm.get('password')!;
  }

  get usernameControl(): AbstractControl{
    return this.loginForm.get('usrnameOrEmail')!;
  }

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void { }

  submitForm(): void{

    debugger;

    const isFormValid = this.validateForm();

    if (isFormValid){

      const loginUser: LoginUser = {
        username: this.loginForm.get('username')?.value,
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      } as LoginUser;
  
      this.authenticationService.login(loginUser);

    }

  }

  resetForm(): void{
    console.warn('reset form');
  }

  private validateForm(): boolean{

    let isFormValid = true;
    let errors: string[] = [];

    if (this.usernameControl.value.indexOf('!') > - 1){
      isFormValid = false;
      errors.push(`Username cannot contain special chars`);
    }

    if (errors.length > 0){

      let errorsString = '';

      errors.forEach((error: string) => {

        errorsString += error + '\n';

      });

      alert('Cannot submit form. Clear following errors: \n' + errorsString);

    }

    return isFormValid;

  }

}
