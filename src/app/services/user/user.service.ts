import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UserResponse } from 'src/app/models/interfaces/user.interface';
import { ApiOperation } from 'src/app/models/enums/api-operation.enum';
import { ApiService } from 'src/app/services/api/api.service';
import { Entity, EntityType } from '../../models/entities/entity';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: Entity[] = [];

  constructor(private apiService: ApiService) { }

  async fetchUsers(): Promise<Entity[]>{

    return new Promise<Entity[]>(async (resolve, reject) => {

      this.users = await this.apiService.get(ApiOperation.getUsers, EntityType.user);

      resolve(this.users);
    
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
