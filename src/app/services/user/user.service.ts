import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from 'src/app/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  async fetchUsers(): Promise<User[]>{

    return new Promise<User[]>((resolve, reject) => {

      this.http.get('http://127.0.0.1:8000/admin/users', { observe: 'response' })
      .subscribe((response: HttpResponse<object>) => {

        if (response.ok && response.status === 200 && response.statusText === 'OK'){

          const data = response.body as User[];

          if (data && data.length > 0){
            resolve(data);
          }
          else{
            reject([]);
          }

        }
        else{
          reject([]);
        }

      });
      
    });

  }

  async registerUser(user: User): Promise<boolean>{

    debugger;
    
    return new Promise<boolean>((resolve, reject) => {

      this.http.post('http://127.0.0.1:8000/admin/register', user)
      .subscribe((response: any) => {

        debugger;

      })

    });

  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
