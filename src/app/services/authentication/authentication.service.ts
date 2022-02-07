import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isAuthenticated = false;

  get isUserAuthenticated(): boolean{
    return this.isAuthenticated;
  }

  constructor(private apiService: ApiService) { }

  public login(): Promise<string>{
    return new Promise<string>((resolve, reject) => {

      this.apiService.post();

    });
  }

  public register(): Promise<string>{
    return new Promise<string>((resolve ,reject) => {

      this.apiService.post();

    });
  }

}
