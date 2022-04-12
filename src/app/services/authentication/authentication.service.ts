import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { RegisterUser } from 'src/app/models/interfaces/register-user.interface';
import { LoginUser } from 'src/app/models/interfaces/login-user.interface';
import { DateTime } from 'luxon';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { UserRole } from 'src/app/models/enums/user-role.enum';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ApiEndpointsService } from 'src/app/services/api-endpoints.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { User } from 'src/app/models/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // private currentUser: User | undefined;
  isUserAuthenticated: boolean;
  private isAdmin: boolean;
  private registerEndpoint: string;
  private loginEndpoint: string;
  private currentUserEndpoint: string;

  closeRegistrationModalSubject: BehaviorSubject<boolean>;
  closeLoginModalSubject: BehaviorSubject<boolean>;
  isUserLoggedInSubject: BehaviorSubject<boolean>;
  isUserAdminSubject: BehaviorSubject<boolean>

  currentUser: User | undefined;
  

  // authenticationSubject: BehaviorSubject<any> = new BehaviorSubject(undefined);
  // adminSubject: BehaviorSubject<any> = new BehaviorSubject(undefined);

  // get isUserAdmin(): boolean {
  //   return this.isAdmin;
  // }

  // get authenticationObservable(): BehaviorSubject<boolean> {
  //   return this.authenticationSubject;
  // }

  // get adminObservable(): BehaviorSubject<boolean> {
  //   return this.adminSubject;
  // }

  // get userRole(): string | undefined {
  //   return this.currentUser?.role;
  // }

  // get loggedUser(): User | undefined {
  //   return this.currentUser;
  // }

  constructor(private apiService: ApiService, private httpClient: HttpClient,
    private toastService: ToastService, private apiEndpointsService: ApiEndpointsService,
    private spinnerService: SpinnerService) {

      this.isUserAuthenticated = false;
      this.isAdmin = false;
      this.registerEndpoint = this.apiEndpointsService.getRegisterEndpoint();
      this.loginEndpoint = this.apiEndpointsService.getLoginEndpoint();
      this.currentUserEndpoint = this.apiEndpointsService.getCurrentUserEndpoint();

      this.closeRegistrationModalSubject = new BehaviorSubject<boolean>(false);
      this.closeLoginModalSubject = new BehaviorSubject<boolean>(false);
      this.isUserLoggedInSubject = new BehaviorSubject<boolean>(false);
      this.isUserAdminSubject = new BehaviorSubject<boolean>(false);

      this.currentUser = undefined;
      
      this.checkLocalStorage();

  }

  public async login(loginUser: LoginUser): Promise<boolean> {

    return new Promise<boolean>(async (resolve, reject) => {

      this.httpClient.post(this.loginEndpoint, loginUser, { observe: 'response' })
        .subscribe({
          
          next: async (response: HttpResponse<object>) => {

            if (response.ok && response.status === 200){

              if ('token' in response.body!){

                const responseBody = response.body!;
                const responseArray = Object.values(responseBody);
                const authToken = responseArray[0] as string;

                this.setSession(authToken);

                // Used by interceptor together with checking access_token
                this.isUserAuthenticated = true;

                resolve(true);
                
              }

            }

          },

          error: (error: HttpErrorResponse) => {

            debugger;

            const errorMessage = {
              status: error.status,
              message: error.message
            };
            
            this.toastService.showError(errorMessage);
            reject(false);
          }

        });

    });

  }

  public async setCurrentUser(): Promise<boolean> {
    
    return new Promise<boolean>((resolve, reject) => {

      this.apiService.get(this.currentUserEndpoint, { observe: 'response' })
      .subscribe({

        next: async(response: HttpResponse<object>) => {

          // Status 200 - success but no content created
          if (response.ok && response.status === 200){
      
            const responseBody = response.body!;      
            const responseArray = Object.values(responseBody);
            
            this.currentUser = responseArray[0] as User;
            this.isAdmin = this.currentUser.role === UserRole.admin;

            const role = this.isAdmin ? 'ROLE_ADMIN' : 'ROLE_USER';

            // Set but what for?
            localStorage.setItem('current_user', JSON.stringify(this.currentUser));

            // In postsComponente there's a 'displayRegisterModal' property.
            // Its value determines if the modal is open
            // True - display; false - hide
            this.closeRegistrationModalSubject.next(false);
            this.closeLoginModalSubject.next(false);
            this.isUserLoggedInSubject.next(true);
            this.isUserAdminSubject.next(this.currentUser.role === UserRole.admin);

            // this.adminObservable.next(this.isUserAdmin);
            
            resolve(true);
      
          }
      
        },
        error: (error: HttpErrorResponse) => {
          debugger;
          
          // It shows error message and then hides spinner
          this.toastService.showError(error);
          reject(false);
        }

      });

    });

  }

  public register(newUser: RegisterUser): Promise<boolean> {

    return new Promise<boolean>((resolve ,reject) => {

      this.apiService.post(this.registerEndpoint, newUser, { observe: 'response' })
      .subscribe({

        next: async(response: HttpResponse<object>) => {

          // Status 201 - new resource created
          if (response.ok && response.status === 201){

            const responseBody = response.body!;
            const responseArray = Object.values(responseBody);
            const authToken = responseArray[0] as string;

            // Used by interceptor together with checking access_token
            this.isUserAuthenticated = true;
            
            this.setSession(authToken);
            
            this.toastService
            .showSuccess('New user successfully registered. You are logged in and can enjoy the service.');

            this.spinnerService.hideSpinner();
            
            resolve(true);
  
          }

        },
        error: (error: HttpErrorResponse) => {
          debugger;
          
          // It shows error message and then hides spinner
          this.toastService.showError(error);
          reject(false);
        }

      });

    });

  }

  private setSession(authToken: string): void {

    const base64Url = authToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const fullPayload = JSON.parse(jsonPayload);

    const expMillis = fullPayload['exp'] * 1000;

    localStorage.setItem('access_token', authToken);
    localStorage.setItem('expires_at', JSON.stringify(expMillis));

  }

  public logout(): void {
    localStorage.clear();
    this.isUserAuthenticated = false;
    this.isAdmin = false;
    this.isUserLoggedInSubject.next(this.isUserAuthenticated);
    this.isUserAdminSubject.next(this.isAdmin);
  }

  // Used by routerService
  public isLoggedIn(): boolean {
    return DateTime.now().valueOf() < this.getExpiration();
  }

  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  private getExpiration(): number {

    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration!);

    return parseInt(expiresAt);

  }

  private checkLocalStorage(): void {

    const token = localStorage.getItem('access_token');
    const expiresAt = localStorage.getItem('expires_at');
    const currentUser: User = JSON.parse(localStorage.getItem('current_user')!) as User;

    this.currentUser = currentUser;

    if (!!token && !!expiresAt){
      this.isUserAuthenticated = true;
      this.isUserLoggedInSubject.next(true);
    }

    if (currentUser?.role === UserRole.admin){
      this.isAdmin = true;
      this.isUserAdminSubject.next(true);
    }

  }

  public getRole(): string | undefined {
    return this.isAdmin ? 'ROLE_ADMIN' : 'ROLE_USER';
  }

}
