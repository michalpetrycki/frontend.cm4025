import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { InputValidators } from 'src/app/validators/input.validators';
import { RegisterUser } from 'src/app/models/interfaces/register-user.interface';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserRole } from 'src/app/models/enums/user-role.enum';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {

  validators: InputValidators;
  registerForm: FormGroup;
  
  get passwordControl(): AbstractControl{
    return this.registerForm.get('password')!;
  }

  get repeatPasswordControl(): AbstractControl{
    return this.registerForm.get('repeatPassword')!;
  }

  get usernameControl(): AbstractControl{
    return this.registerForm.get('username')!;
  }

  constructor(private authenticationService: AuthenticationService, private spinnerService: SpinnerService) { 

    this.validators = new InputValidators();
    this.registerForm = new FormGroup({

      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30), this.validators.specialCharsValidator()]),
      email: new FormControl('', [Validators.required, this.validators.specialCharsValidator]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required]),
  
    });

  }

  async submitForm(): Promise<void> {

    return new Promise(async (resolve, reject) => {

      this.spinnerService.showSpinner();

      const newUser: RegisterUser = {
        username: this.registerForm.get('username')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        role: UserRole.user
      } as RegisterUser;

      const register_success: boolean = await this.authenticationService.register(newUser);

      this.spinnerService.showSpinner();
      const current_user_success: boolean = await this.authenticationService.setCurrentUser();
      this.spinnerService.hideSpinner();

      this.resetForm();

    });

  }

  public async resetForm(): Promise<void>{
    return new Promise<void>((resolve) => {
      this.registerForm.reset();
      resolve();
    });
  }

  onPasswordChange(): void{

    if (this.passwordControl.value === this.repeatPasswordControl.value){
      this.repeatPasswordControl.setErrors(null);
    }
    else{
      this.repeatPasswordControl.setErrors({ mismatch: true });
    }

  }

}
