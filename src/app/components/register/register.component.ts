import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { InputValidators } from 'src/app/validators/input.validators';
import { RegisterUser } from 'src/app/models/interfaces/register-user.interface';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserRole } from 'src/app/models/enums/user-role.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  validators: InputValidators = new InputValidators();

  registerForm = new FormGroup({

    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(30), this.validators.specialCharsValidator()]),
    email: new FormControl('', [Validators.required, this.validators.specialCharsValidator]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required]),

  });

  get passwordControl(): AbstractControl{
    return this.registerForm.get('password')!;
  }

  get repeatPasswordControl(): AbstractControl{
    return this.registerForm.get('repeatPassword')!;
  }

  get usernameControl(): AbstractControl{
    return this.registerForm.get('username')!;
  }

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  submitForm(): void{

    const newUser: RegisterUser = {
      username: this.registerForm.get('username')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      role: UserRole.user
    } as RegisterUser;

    this.authenticationService.register(newUser);

  }

  resetForm(): void{
    console.warn('reset form');
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
