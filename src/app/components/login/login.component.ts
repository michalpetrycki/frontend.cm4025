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

    email: new FormControl('', [Validators.required, Validators.email, this.validators.specialCharsValidator]),
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

  async submitForm(): Promise<void>{

    const loginUser: LoginUser = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    } as LoginUser;

    await this.authenticationService.login(loginUser);
    await this.authenticationService.setCurrentUser();

    this.loginForm.reset();

  }

  resetForm(): void{
    this.loginForm.reset();
  }

}
