import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { User } from 'src/app/models/interfaces/user.interface';
import { ApiEndpointsService } from 'src/app/services/api-endpoints.service';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  // users: Entity[] = [];
  users: User[];
  private usersEndpoint: string;

  constructor(private apiService: ApiService, private apiEndpointsService: ApiEndpointsService, private toastService: ToastService) {

    this.users = [];
    this.usersEndpoint = this.apiEndpointsService.getUsersEndpoint();
    
  }

  async fetchUsers(): Promise<User[]>{

    return new Promise<User[]>(async (resolve, reject) => {

      this.apiService.get(this.usersEndpoint, { observe: 'response' })
      .subscribe({

        next: async(response: HttpResponse<object>) => {

          if (response.ok && response.status === 200 && response.statusText === 'OK'){

            const responseBody = response.body!;
  
            const responseArray = Object.values(responseBody);
            const users = responseArray[0] as User[];
            
            resolve(users);
  
          }
          else {
            resolve([]);
          }

        },
        error: (error: HttpErrorResponse) => {

          debugger;

          this.toastService.showError(error);
          reject(false);
        }

      });

    });

  }

  async updateUser(user: User): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {

      this.apiService.patch(this.usersEndpoint, user, { observe: 'response' })
      .subscribe({

        next: async(response: HttpResponse<object>) => {

          // Status 200 - resource updated
          if (response.ok && response.status === 200){

            const responseBody = response.body!;
  
            const responseArray = Object.values(responseBody);
            const updatedUser = responseArray[0] as User;

            this.toastService.showSuccess('User successfully edited');
            
            resolve(updatedUser !== null && updatedUser !== undefined);
  
          }

        },
        error: (error: HttpErrorResponse) => {
          debugger;
          
          this.toastService.showError(error);
          reject(false);
        }

      });

    });

  }

}
