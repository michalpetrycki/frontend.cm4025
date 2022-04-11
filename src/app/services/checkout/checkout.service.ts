import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  checkoutInformation: any;

  constructor() {

    this.checkoutInformation = {};

  }

  public complete(): void {
    alert(JSON.stringify(this.checkoutInformation));
  }

}
