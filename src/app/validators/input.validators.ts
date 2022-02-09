import { AbstractControl, FormControl,ValidatorFn, ValidationErrors } from "@angular/forms";

export class InputValidators{

    usernameValidator(): ValidatorFn {

        return (control: AbstractControl): ValidationErrors | null => {

            const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

            return (control.value && nameRegexp.test(control.value)) ? { invalidName: { value: control.value } } : null;

        };
                
    };

}