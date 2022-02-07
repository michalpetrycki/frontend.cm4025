import { FormControl } from "@angular/forms";

export class InputValidators{

    usernameValidator(control: FormControl): { [key: string]: boolean }{
        
        const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

        let error = {
            invalidUsername: false
        };

        if (control.value && nameRegexp.test(control.value)){
            error.invalidUsername = true ;
        }

        return error;

    }

}