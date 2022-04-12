import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserRole } from 'src/app/models/enums/user-role.enum';
import { NavigationButton } from 'src/app/models/interfaces/navigation-button.interface';
import { User } from 'src/app/models/interfaces/user.interface';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { RouterService } from 'src/app/services/router/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {

  navigationButtons: NavigationButton[];
  currentlySelectedButton: NavigationButton | undefined;

  isUserLoggedInSubscription: Subscription | undefined;
  isUserAdminSubscription: Subscription | undefined;
  currentUserSubscription: Subscription | undefined;

  isLoggedIn: boolean;
  isAdmin: boolean;

  currentUser: User | undefined;

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

    this.currentUserSubscription = this.authenticationService.currentUserSubject.subscribe(updatedUser => {
      this.currentUser = updatedUser;
    });

    this.navigationButtons = this.createNavigationButtons();
    this.currentlySelectedButton = (JSON.parse(localStorage.getItem('currently_selected_navigation_button')!) as unknown as NavigationButton) || this.navigationButtons.find(x => x.text === 'Posts');

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
    // buttons.push({ routerLink: '/users', text: 'Users', class: 'pi pi-users', displayForUserRole: 'admin'  });
    buttons.push({ routerLink: '/posts', text: 'Posts', class: 'pi pi-comments', displayForUserRole: 'all'  });
    buttons.push({ routerLink: '/shop-management', text: 'Shop management', class: 'pi pi-book', displayForUserRole: 'admin'  });
    buttons.push({ routerLink: '/shop', text: 'Shop', class: 'pi pi-shopping-cart', displayForUserRole: 'all'  });
    buttons.push({ routerLink: '/profile', text: 'My Profile', class: 'pi pi-user', displayForUserRole: 'all' });
    buttons.push({ routerLink: '/logout', text: 'Logout', class: 'pi pi-sign-out', displayForUserRole: 'all' });

    return buttons;

  }

  // Save to localStorage so on page refresh can revert active button
  public updateCurrentlySelected(button: NavigationButton): void {
    this.currentlySelectedButton = button;
    localStorage.setItem('currently_selected_navigation_button', JSON.stringify(this.currentlySelectedButton));
  }

  public canDisplayButtonForUser(button: NavigationButton): boolean {

    switch (button.displayForUserRole){

      case 'all':{
        return true;
      }
        
      case 'admin': {
        return this.currentUser?.role === UserRole.admin;
      }

      default: {
        return false;
      }

    }

  }

}
