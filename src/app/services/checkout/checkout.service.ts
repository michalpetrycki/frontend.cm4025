import { Injectable } from '@angular/core';
import { BasketService } from 'src/app/services/basket/basket.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  checkoutInformation: any;

  constructor(private basketService: BasketService) {

    this.checkoutInformation = {};

  }

  public complete(): void {

    let m = JSON.stringify(this.checkoutInformation);

    const products = this.basketService.getContent();
    const quantities = this.basketService.quantities;

    for (let i = 0; i < products.length; i++){

      m += `(${products[i].name} * ${quantities[i]} = £${products[i].price * quantities[i]})\n`;

    }

    alert(JSON.stringify(m));
  }

}
