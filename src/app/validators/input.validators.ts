import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

export class InputValidators{

    specialCharsValidator(): ValidatorFn {

        return (control: AbstractControl): ValidationErrors | null => {

            const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

            return (control.value && nameRegexp.test(control.value)) ? { invalidUsername: { value: control.value } } : null;

        };

    };

}
