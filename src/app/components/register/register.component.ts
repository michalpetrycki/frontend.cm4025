import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { InputValidators } from 'src/app/validators/input.validators';
import { RegisterUser } from 'src/app/models/interfaces/register-user.interface';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

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

    debugger;

    const isFormValid = this.validateForm();

    if (isFormValid){

      const newUser: RegisterUser = {
        username: this.registerForm.get('username')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        repeatPassword: this.registerForm.get('repeatPassword')?.value,
        role: 'user'
      } as RegisterUser;

      this.authenticationService.register(newUser);

    }

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

  private validateForm(): boolean{

    let isFormValid = true;
    let errors: string[] = [];

    if (this.passwordControl.value !== this.repeatPasswordControl.value){
      isFormValid = false;
      errors.push(`Repeat password and password don't match`);
    }

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
