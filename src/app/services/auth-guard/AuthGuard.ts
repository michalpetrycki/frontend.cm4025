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
        const userRole = this.checkUserLogin(route);

        debugger;

        if (currentUser && userRole) {
            // authorised so return true
            return true;
        }
        else if (!userRole){
            this.toastService.showError('Unauthorized. Only admin can visit this page.');
            return false;
        }

        this.toastService.showError('Unauthorized. Please login first.');
        // not logged in so redirect to login page with the return url
        // this.router.navigate(['/posts'], { queryParams: { returnUrl: state.url }});
        return false;
    }

    checkUserLogin(route: ActivatedRouteSnapshot): boolean {

        debugger;

        if (this.authenticationService.isLoggedIn()) {
            const userRole = this.authenticationService.getRole();
            if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
              this.router.navigate(['/posts']);
              return false;
            }
            return true;
          }
      
        this.router.navigate(['/posts']);
        return false;

    }

}