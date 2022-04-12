import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserRole } from 'src/app/models/enums/user-role.enum';
import { NavigationButton } from 'src/app/models/interfaces/navigation-button.interface';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { RouterService } from 'src/app/services/router/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentUserRole: string | undefined;

  navigationButtons: NavigationButton[];

  isUserLoggedInSubscription: Subscription | undefined;
  isUserAdminSubscription: Subscription | undefined;

  isLoggedIn: boolean;
  isAdmin: boolean;

  constructor(private authenticationService: AuthenticationService, private routerService: RouterService){

    // debugger;

    this.isLoggedIn = false;
    this.isAdmin = false;

    this.isUserLoggedInSubscription = this.authenticationService.isUserLoggedInSubject.subscribe(isLoggedIn => {
      // debugger;
      this.isLoggedIn = isLoggedIn;
    });

    this.isUserAdminSubscription = this.authenticationService.isUserAdminSubject.subscribe(isAdmin => {
      // debugger;
      this.isAdmin = isAdmin;
    });

    this.navigationButtons = this.createNavigationButtons();

  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    
    if (this.isUserAdminSubscription){
      this.isUserAdminSubscription.unsubscribe();
    }

    if (this.isUserLoggedInSubscription){
      this.isUserLoggedInSubscription.unsubscribe();
    }
    
  }

  public logout(): void {
    this.routerService.navigateTo('logout');
  }

  private createNavigationButtons(): NavigationButton[]{

    const buttons: NavigationButton[] = [];

    buttons.push({ routerLink: '/admin', text: 'Admin', class: 'pi pi-key', displayForUserRole: 'admin' });
    buttons.push({ routerLink: '/users', text: 'Users', class: 'pi pi-users', displayForUserRole: 'admin'  });
    buttons.push({ routerLink: '/posts', text: 'Posts', class: 'pi pi-book', displayForUserRole: 'user'  });
    buttons.push({ routerLink: '/profile', text: 'My Profile', class: 'pi pi-user', displayForUserRole: 'user' });
    buttons.push({ routerLink: '/logout', text: 'Logout', class: 'pi pi-sign-out', displayForUserRole: 'all' });

    return buttons;

  }

  public canDisplayButtonForUser(button: NavigationButton): boolean{

    switch (button.displayForUserRole){

      case 'all':{
        return true;
      }
        
      case 'admin': {
        return this.currentUserRole === UserRole.admin;
      }

      case 'user': {
        return this.currentUserRole === UserRole.user;
      }

      default: {
        return false;
      }

    }

  }

}
