import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // BaseUrl = 'localhost:8000/api/
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  get(): Promise<void>{
    return new Promise<void>((resolve, reject) => {});
  }

  post(): Promise<void>{
    return new Promise<void>((resolve, reject) => {});
  }

}
