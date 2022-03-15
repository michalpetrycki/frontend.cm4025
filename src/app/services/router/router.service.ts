import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router: Router, private authenticationService: AuthenticationService) { 

    // This code intercepts page refresh event
    this.router.events
    .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
    .subscribe(event => {

      if (event.id === 1 && event.url === event.urlAfterRedirects){

        const isUserLoggedIn = this.authenticationService.isLoggedIn();

        if (!isUserLoggedIn){
          this.navigateTo('/login');
        }

      }

    });

  }

  /**
   * This function navigates to path passed as an argument.
   * @param path - Desired path e.g., '/users'
   * @returns - Promise<void>
   */
  navigateTo(path: string): Promise<void>{

    return new Promise<void>((resolve) => {

      this.router.navigate([path]);
      resolve();

    });

  }

}
