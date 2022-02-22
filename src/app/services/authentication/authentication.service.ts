import { Injectable } from '@angular/core';
import { ApiOperation } from 'src/app/models/enums/api-operation.enum';
import { ApiService } from 'src/app/services/api/api.service';
import { RegisterUser } from 'src/app/models/interfaces/register-user.interface';
import { LoginUser } from 'src/app/models/interfaces/login-user.interface';
import { DateTime } from 'luxon';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isAuthenticated = false;
  private baseUrl = environment.baseUrl;

  authenticationSubject: BehaviorSubject<any> = new BehaviorSubject(undefined);

  get isUserAuthenticated(): boolean{
    return this.isAuthenticated;
  }

  get authenticationObservable(): BehaviorSubject<boolean>{
    return this.authenticationSubject;
  }

  constructor(private apiService: ApiService, private httpClient: HttpClient) { }

  public async login(loginUser: LoginUser): Promise<string>{
    return new Promise<string>(async (resolve, reject) => {

      this.httpClient.post(this.baseUrl + ApiOperation.login, loginUser, { observe: 'response' })
        .subscribe((response: HttpResponse<object>) => {

          if (response.ok && response.status === 200 && response.statusText === 'OK'){

            if ('token' in response.body!){

              const token = response.body['token'];
              this.setSession(token);

              this.authenticationObservable.next(this.isUserAuthenticated);

            }

          }
          else{
            debugger;
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

    const expDate = DateTime.fromMillis(fullPayload['exp'] * 1000).toFormat('DD/MM/YYYY HH:mm:ss');

    localStorage.setItem('id_token', authToken);
    localStorage.setItem('expires_at', JSON.stringify(expDate));

    this.isAuthenticated = true;

  }

  public logout(): void{
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn(): boolean{
    return DateTime.now() < this.getExpiration();
  }

  public isLoggedOut(): boolean{
    return !this.isLoggedIn();
  }

  getExpiration(): DateTime{

    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration!);

    return DateTime.fromJSDate(expiresAt);

  }


}
