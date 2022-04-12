import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';


@Injectable({
  providedIn: 'root'
})
export class RouterService implements OnDestroy {

  constructor(private router: Router, private authenticationService: AuthenticationService, private spinnerService: SpinnerService) { 

    // This code intercepts page refresh event
    this.router.events
    .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
    .subscribe(event => {

      if (event.id === 1 && event.url === event.urlAfterRedirects){

        if (event.url !== '/register'){

          const isUserLoggedIn = this.authenticationService.isLoggedIn();

          if (!isUserLoggedIn && event.url){
            this.navigateTo('/posts');
            this.spinnerService.hideSpinner();
          }

        }

      }

    });

  }

  ngOnDestroy(): void {
    
    const subscription = this.router.events.subscribe();
    if (subscription) {
      subscription.unsubscribe();
    }

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

  navigateWithData(path: string, routerData: any): Promise<void> {

    return new Promise<void>((resolve) => {

      this.router.navigateByUrl(path, routerData);
      resolve();

    });

  }

}
