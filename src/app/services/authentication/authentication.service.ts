import { Injectable } from '@angular/core';
import { ApiOperation } from 'src/app/models/enums/api-operation.enum';
import { ApiService } from 'src/app/services/api/api.service';
import { RegisterUser } from 'src/app/models/interfaces/register-user.interface';
import { LoginUser } from 'src/app/models/interfaces/login-user.interface';
import { DateTime } from 'luxon';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isAuthenticated = false;

  get isUserAuthenticated(): boolean{
    return this.isAuthenticated;
  }

  constructor(private apiService: ApiService) { }

  public login(loginUser: LoginUser): Promise<string>{
    return new Promise<string>((resolve, reject) => {

      this.apiService.post(ApiOperation.login, loginUser);

    });
  }

  public register(newUser: RegisterUser): Promise<string>{
    return new Promise<string>((resolve ,reject) => {

      this.apiService.post(ApiOperation.register, newUser);

    });
  }

  private setSession(authResult: any): void{

    const expiresAt = DateTime.now().plus(authResult.expiresIn);

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(authResult.expires_at.valueof()));

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

    return DateTime.fromISO(expiresAt);

  }


}
