import { Component, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  authSubscription: Subscription | undefined;
  adminSubscription: Subscription | undefined;

  currentUserRole: string | undefined;

  navigationButtons: NavigationButton[];

  constructor(private authenticationService: AuthenticationService, private routerService: RouterService){

    this.navigationButtons = this.createNavigationButtons();

    this.isAuthenticated = this.authenticationService.isUserAuthenticated;
    this.isAdmin = this.authenticationService.isUserAdmin;
    this.currentUserRole = this.authenticationService.userRole;

  }

  ngOnInit(): void {

    this.authSubscription = this.authenticationService.authenticationObservable.subscribe(isUserAuthenticated => {
      
      if (isUserAuthenticated !== undefined){
        this.isAuthenticated = isUserAuthenticated;
      }
      
    });

    this.adminSubscription = this.authenticationService.adminObservable.subscribe(isUserAdmin => {

      if (isUserAdmin !== undefined){

        this.isAdmin = isUserAdmin;

        if (this.isAdmin){
          this.routerService.navigateTo('/admin');
        }

      }

    });

  }

  public logout(): void{
    this.authenticationService.logout();
    this.routerService.navigateTo('/login');
  }

  private createNavigationButtons(): NavigationButton[]{

    const buttons: NavigationButton[] = [];

    buttons.push({ routerLink: '/admin', text: 'Admin', class: 'pi pi-key', displayForUserRole: 'admin' });
    buttons.push({ routerLink: '/users', text: 'Users', class: 'pi pi-users', displayForUserRole: 'admin'  });
    buttons.push({ routerLink: '/posts', text: 'Posts', class: 'pi pi-book', displayForUserRole: 'user'  });
    // buttons.push({ routerLink: '/login', text: 'Login', class: 'pi pi-sign-in', displayForUserRole: ''  });
    // buttons.push({ routerLink: '/register', text: 'Register', class: 'pi pi-user-plus', displayForUserRole: ''  });
    buttons.push({ routerLink: '/logout', text: 'Logout', class: 'pi pi-sign-out', displayForUserRole: 'all' })

    return buttons;

  }

  public canDisplayButtonForUser(button: NavigationButton): boolean{

    let display = false;

    switch (button.displayForUserRole){

      case 'all':{
        display = true;
        break;
      }
        
      case 'admin': {
        display = this.currentUserRole === UserRole.admin;
        break;
      }

      case 'user': {
        display = this.currentUserRole === UserRole.user;
        break;
      }

      default: {
        display = false;
        break;
      }

    }

    return display;

  }



  // getActiveRoute(): string{

  //   return 'abcd';

  // }



}
