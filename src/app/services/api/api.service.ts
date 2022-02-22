import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiOperation } from 'src/app/models/enums/api-operation.enum';
import { Entity, EntityType } from 'src/app/models/entities/entity';
import { User } from 'src/app/models/entities/user';
import { UserResponse } from 'src/app/models/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // BaseUrl = 'localhost:8000/api/
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  get(apiOperation: ApiOperation, entityType: EntityType): Promise<Entity[]>{

    return new Promise<Entity[]>((resolve, reject) => {

      this.httpClient.get(this.baseUrl + apiOperation, { observe: 'response' })
      .subscribe((response: HttpResponse<object>) => {

        if (response.ok && response.status === 200 && response.statusText === 'OK'){

          const entities: Entity[] = this.extractAndSetEntities(response.body, entityType);

          if (entities && entities.length > 0){
            resolve(entities);
          }
          else{
            reject([]);
          }

        }

      });


    });
  }

  async post(apiOperation: ApiOperation, body: any): Promise<void>{
    return new Promise<void>((resolve, reject) => {

      this.httpClient.post(this.baseUrl + apiOperation, body, { observe: 'response' })
      .subscribe((response: HttpResponse<object>) => {

        if (response.ok && response.status === 201 && response.statusText === 'Created'){
          debugger;
        }
        else{
          debugger;
        }

      });

    });
  }

  extractAndSetEntities(responseBody: object | null, entityType: EntityType): Entity[]{

    let entities: Entity[] = [];

    if (responseBody){

      switch (entityType){

        case EntityType.user: {
          const values = Object.values(responseBody);
          entities = values[0].map((x: UserResponse) => new User(x));
          break;
        };
  
        case EntityType.post: {
          break;
        }
  
        default: {
          break;
        }
  
      }

    }
    
    return entities;

  }

}
