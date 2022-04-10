import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // BaseUrl = 'localhost:8000/api/
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private toastService: ToastService) { }

  // get(apiOperation: ApiOperation, entityType: EntityType): Promise<Entity[]>{

  //   return new Promise<Entity[]>((resolve, reject) => {

  //     this.httpClient.get(this.baseUrl + apiOperation, { observe: 'response' })
  //     .subscribe((response: HttpResponse<object>) => {

  //       if (response.ok && response.status === 200 && response.statusText === 'OK'){

  //         const entities: Entity[] = this.extractAndSetEntities(response.body, entityType);

  //         if (entities && entities.length > 0){
  //           resolve(entities);
  //         }
  //         else{
  //           reject([]);
  //         }

  //       }

  //     });


  //   });
  // }

  // async post(apiOperation: ApiOperation, body: any): Promise<void>{
  //   return new Promise<void>((resolve, reject) => {

  //     this.httpClient.post(this.baseUrl, body, { observe: 'response' })
  //     .subscribe({
  //       next: async(response: HttpResponse<object>) => {

  //         if (response.ok && response.status === 201 && response.statusText === 'Created'){
          
  //           this.toastService.showSuccess(response.statusText);
  //           resolve();
  
  //         }

  //       },
  //       error: (error: HttpErrorResponse) => {
  //         this.toastService.showError(error);
  //         reject(false);
  //       }
  //     });

  //   });
  // }

  // Below idea taken from
  // https%3A%2F%2Fbetterprogramming.pub%2Fangular-api-calls-the-right-way-264198bf2c64

  public get(url: string, options?: any): Observable<any> {
    return this.http.get(url, options);
  }

  public post(url: string, data: any, options?: any): Observable<any> {
    return this.http.post(url, data, options);
  }

  public put(url: string, data: any, options?: any): Observable<any> {
    return this.http.put(url, data, options);
  }

  public patch(url: string, data: any, options?: any): Observable<any> {
    return this.http.patch(url, data, options);
  }

  public delete(url: string, options?: any): Observable<any> {
    return this.http.delete(url, options);
  }

}
