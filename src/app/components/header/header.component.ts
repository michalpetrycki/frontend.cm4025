import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { RouterService } from 'src/app/services/router/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  authSubscription: Subscription | undefined;
  adminSubscription: Subscription | undefined;

  displayLoginButton = false;
  displayRegisterButton = false;

  constructor(private authenticationService: AuthenticationService, private routerService: RouterService){}

  ngOnInit(): void {

    this.isAuthenticated = this.authenticationService.isUserAuthenticated;
    this.isAdmin = this.authenticationService.isUserAdmin;

    this.authSubscription = this.authenticationService.authenticationObservable.subscribe(isUserAuthenticated => {
      
      this.isAuthenticated = isUserAuthenticated;

    });

    this.adminSubscription = this.authenticationService.adminObservable.subscribe(isUserAdmin => {

      debugger;
      
      this.isAdmin = isUserAdmin;

      if (this.isAdmin){
        this.routerService.navigateTo('/admin');
      }

    });

  }

  logout(): void{
    this.authenticationService.logout();
    this.routerService.navigateTo('/login');
  }

  // getActiveRoute(): string{

  //   return 'abcd';

  // }



}
