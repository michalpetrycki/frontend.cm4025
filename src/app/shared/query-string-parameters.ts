// code taken from 
// https%3A%2F%2Fbetterprogramming.pub%2Fangular-api-calls-the-right-way-264198bf2c64

export class QueryStringParameters {
    
    private paramsAndValues: string[];  
    
    constructor() {
      this.paramsAndValues = [];
    }
    
    public push(key: string, value: Object): void {
        value = encodeURIComponent(value.toString());
        this.paramsAndValues.push([key, value].join('='));
    }  
    
    public toString(): string {
        return this.paramsAndValues.join('&');
    }

}
