import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  authSubscription: Subscription;

  isAuthenticated = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) {

    this.isAuthenticated = authenticationService.isUserAuthenticated;

    this.authSubscription = authenticationService.authenticationObservable.subscribe(isUserAuthenticated => {
      
      if (isUserAuthenticated){

        this.isAuthenticated = true;

        this.router.navigate(['/admin']);

      }

    });

  }

}
