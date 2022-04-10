// code taken from 
// https%3A%2F%2Fbetterprogramming.pub%2Fangular-api-calls-the-right-way-264198bf2c64

// Angular Modules
import { Injectable } from '@angular/core';
// Application Classes
import { UrlBuilder } from 'src/app/shared/url-builder';
import { QueryStringParameters } from 'src/app/shared/query-string-parameters';
// Application Constants
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiEndpointsService {  
    
    constructor() { }
  
    // URL
    private createUrl(action: string, isMockAPI: boolean = false): string {
    
        const urlBuilder: UrlBuilder = new UrlBuilder(environment.baseUrl, action);
        return urlBuilder.toString();

    }
    
    // URL WITH QUERY PARAMS
    private createUrlWithQueryParameters(action: string, queryStringHandler?: (queryStringParameters: QueryStringParameters) => void): string {
    
        const urlBuilder: UrlBuilder = new UrlBuilder(environment.baseUrl, action);
    
        // Push extra query string params
        if (queryStringHandler) {
            queryStringHandler(urlBuilder.queryString);
        }
        
        return urlBuilder.toString();

    }
  
    // URL WITH PATH VARIABLES
    private createUrlWithPathVariables(action: string, pathVariables: any[] = []): string {
    
        let encodedPathVariablesUrl: string = '';
        
        // Push extra path variables
        for (const pathVariable of pathVariables) {
        
            if (pathVariable !== null) {
        
                encodedPathVariablesUrl += `/${encodeURIComponent(pathVariable.toString())}`;
        
            }
        
        }
    
    
        const urlBuilder: UrlBuilder = new UrlBuilder(environment.baseUrl, `${action}${encodedPathVariablesUrl}`);

        return urlBuilder.toString();

    }

    public getPostsEndpoint(): string {
        return this.createUrl('posts');
    }

    public getUsersEndpoint(): string {
        return this.createUrl('users/login');
    }

    public getCurrentUserEndpoint(): string {
        return this.createUrl('users/current');
    }

    // public getDeletePostEndpoint(param: string): string {
    //     return this.createUrl('posts', [param]);
    // }

}
