import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LoginUser } from 'src/app/models/interfaces/login-user.interface';
import { InputValidators } from 'src/app/validators/input.validators';
import { RouterService } from 'src/app/services/router/router.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  isUserAdmin: boolean;
  validators: InputValidators;
  loginForm: FormGroup;

  get passwordControl(): AbstractControl{
    return this.loginForm.get('password')!;
  }

  get usernameControl(): AbstractControl{
    return this.loginForm.get('usrnameOrEmail')!;
  }

  constructor(private authenticationService: AuthenticationService, private spinnerService: SpinnerService) { 

    this.isUserAdmin = false;
    this.validators = new InputValidators();
    this.loginForm = new FormGroup({

      email: new FormControl('', [Validators.required, Validators.email, this.validators.specialCharsValidator]),
      password: new FormControl('', [Validators.required]),
  
    });

  }

  public async login(): Promise<void>{

    return new Promise<void>(async (resolve, reject) => {

      this.spinnerService.showSpinner();

      const loginUser: LoginUser = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      } as LoginUser;
  
      // Discussion here on hashing passwords on client side. Tl;dr doesn't improve security
      // https://stackoverflow.com/questions/3715920/is-it-worth-hashing-passwords-on-the-client-side
      const login_success: boolean = await this.authenticationService.login(loginUser);
      this.spinnerService.hideSpinner();

      this.spinnerService.showSpinner();
      const current_user_success: boolean = await this.authenticationService.setCurrentUser();
      this.spinnerService.hideSpinner();

      debugger;
  
      if (login_success && current_user_success){
  
        this.resetForm();
        resolve();
  
      }
      else{
        reject();
      }

    });

  }

  public async resetForm(): Promise<void>{
    return new Promise<void>((resolve) => {
      this.loginForm.reset();
      resolve();
    });
  }

}
