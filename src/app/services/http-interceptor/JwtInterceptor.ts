// Code taken from here:
// https://jasonwatmore.com/post/2021/09/24/angular-http-interceptor-to-set-auth-header-for-api-requests-if-user-logged-in

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in and request is to the api url
        const isLoggedIn = this.authenticationService.isUserAuthenticated;
        const isApiUrl = request.url.startsWith(environment.baseUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
            setHeaders: { Authorization: `Bearer ${localStorage.getItem('id_token')}` }
            });
        }

        return next.handle(request);
    }
}