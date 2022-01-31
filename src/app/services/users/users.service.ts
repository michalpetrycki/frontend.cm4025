import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  async fetchUsers(): Promise<any>{

    return new Promise<any>((resolve, reject) => {

      this.http.get<any>('/admin/users').subscribe((data: any) => {
        resolve(data);
      });

    });

  }

}
