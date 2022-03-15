import { Injectable } from '@angular/core';
import { ApiOperation } from 'src/app/models/enums/api-operation.enum';
import { ApiService } from 'src/app/services/api/api.service';
import { RegisterUser } from 'src/app/models/interfaces/register-user.interface';
import { LoginUser } from 'src/app/models/interfaces/login-user.interface';
import { DateTime } from 'luxon';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { User } from 'src/app/models/entities/user';
import { UserRole } from 'src/app/models/enums/user-role.enum';
import { ToastService } from 'src/app/services/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUser: User | undefined;
  private isAuthenticated = false;
  private isAdmin = false;
  private baseUrl = environment.baseUrl;

  authenticationSubject: BehaviorSubject<any> = new BehaviorSubject(undefined);
  adminSubject: BehaviorSubject<any> = new BehaviorSubject(undefined);

  get isUserAuthenticated(): boolean{
    return this.isAuthenticated;
  }

  get isUserAdmin(): boolean{
    return this.isAdmin;
  }

  get authenticationObservable(): BehaviorSubject<boolean>{
    return this.authenticationSubject;
  }

  get adminObservable(): BehaviorSubject<boolean>{
    return this.adminSubject;
  }

  get userRole(): string | undefined{
    return this.currentUser?.role;
  }


  constructor(private apiService: ApiService, private httpClient: HttpClient, private toastService: ToastService) {
    this.checkLocalStorage();
  }

  public async login(loginUser: LoginUser): Promise<void>{

    return new Promise<void>(async (resolve, reject) => {

      this.httpClient.post(this.baseUrl + ApiOperation.login, loginUser, { observe: 'response' })
        .subscribe({
          
          next: async (response: HttpResponse<object>) => {

            if (response.ok && response.status === 200 && response.statusText === 'OK'){

              if ('token' in response.body!){

                const token = response.body['token'];
                this.setSession(token);

                resolve();
                // this.authenticationObservable.next(this.isUserAuthenticated);

              }

            }
            else{
              reject();
            }

          },

          error: (error: HttpErrorResponse) => {
            this.toastService.showError(error);
            reject();
          }

        });

    });
  }

  public register(newUser: RegisterUser): Promise<string>{
    return new Promise<string>((resolve ,reject) => {

      this.apiService.post(ApiOperation.register, newUser);

    });
  }

  private setSession(authToken: string): void{

    const base64Url = authToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const fullPayload = JSON.parse(jsonPayload);

    const expMillis = fullPayload['exp'] * 1000;

    localStorage.setItem('id_token', authToken);
    localStorage.setItem('expires_at', JSON.stringify(expMillis));

    this.isAuthenticated = true;

  }

  public logout(): void{
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.isAuthenticated = false;
    this.authenticationObservable.next(this.isUserAuthenticated);
  }

  public isLoggedIn(): boolean{
    return DateTime.now().valueOf() < this.getExpiration();
  }

  public isLoggedOut(): boolean{
    return !this.isLoggedIn();
  }

  private getExpiration(): number{

    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration!);

    return parseInt(expiresAt);

  }

  private checkLocalStorage(): void{

    const token = localStorage.getItem('id_token');
    const expiresAt = localStorage.getItem('expires_at');

    if (!!token && !!expiresAt){
      this.isAuthenticated = true;
    }

  }

  public async setCurrentUser(): Promise<void>{
    
    return new Promise<void>((resolve, reject) => {

      this.httpClient.get(this.baseUrl + ApiOperation.currentUser, { observe: 'response' })
        .subscribe((response: HttpResponse<object>) => {

          if (response.ok && response.status === 200 && response.statusText === 'OK') {

            if ('user' in response['body']!){

              debugger;

              this.currentUser = new User(response.body['user']);

              console.log(JSON.stringify(this.currentUser));

              this.isAdmin = this.currentUser.role === UserRole.admin;

              console.log(this.isAdmin);

              this.adminObservable.next(this.isUserAdmin);

              resolve()

            }
            

          }
          else{
            debugger;
            reject();
          }

      });

    });

  }

}
