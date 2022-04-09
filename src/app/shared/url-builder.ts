// code taken from 
// https%3A%2F%2Fbetterprogramming.pub%2Fangular-api-calls-the-right-way-264198bf2c64

// Application Classes
import { QueryStringParameters } from 'src/app/shared/query-string-parameters';

export class UrlBuilder {

    public url: string;
    public queryString: QueryStringParameters;
    
    constructor(private baseUrl: string, private action: string, queryString?: QueryStringParameters) {
      this.url = [this.baseUrl, this.action].join('/');
      this.queryString = queryString || new QueryStringParameters();
    }  
    
    public toString(): string {
        
        const qs: string = this.queryString ? this.queryString.toString() : '';
        return qs ? `${this.url}?${qs}` : this.url;

    }

}
