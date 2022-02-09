import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiOperation } from 'src/app/models/enums/api-operation.enum';
import { Entity } from 'src/app/models/entities/entity';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // BaseUrl = 'localhost:8000/api/
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  get(apiOperation: ApiOperation): Promise<Entity[]>{
    return new Promise<Entity[]>((resolve, reject) => {

      this.httpClient.get(this.baseUrl + apiOperation, { observe: 'response' })
      .subscribe((response: HttpResponse<object>) => {

        if (response.ok && response.status === 200 && response.statusText === 'OK'){

          const entities: Entity[] = this.extractAndSetEntities(response.body);

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

  post(apiOperation: ApiOperation, body: any): Promise<void>{
    return new Promise<void>((resolve, reject) => {

      this.httpClient.post(this.baseUrl + apiOperation, body, { observe: 'response' })
      .subscribe((response: HttpResponse<object>) => {

        debugger;
        
        if (response.ok && response.status === 201 && response.statusText === 'Created'){
          debugger;
        }
        else{
          debugger;
        }

      });

    });
  }

  extractAndSetEntities(responseBody: object | null): Entity[]{

    return new Array<Entity>();

  }

}
