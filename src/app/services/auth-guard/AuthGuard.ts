// Code taken from here:
// https://jasonwatmore.com/post/2019/06/10/angular-8-user-registration-and-login-example-tutorial

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private toastService: ToastService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const currentUser = this.authenticationService.isUserAuthenticated;
        if (currentUser) {
            // authorised so return true
            return true;
        }

        this.toastService.showError('Unauthorized. Please login first.');
        // not logged in so redirect to login page with the return url
        // this.router.navigate(['/posts'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}