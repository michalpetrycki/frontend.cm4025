import { Component } from '@angular/core';
import { Product } from 'src/app/models/interfaces/product.interface';
import { BasketService } from 'src/app/services/basket/basket.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { RouterService } from 'src/app/services/router/router.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass']
})
export class BasketComponent {

  basket: Product[];
  quantity: number[];
  totalAmount: number;

  constructor(private navigationService: NavigationService, private basketService: BasketService, private routerService: RouterService) { 
    
    this.basket = this.basketService.getContent();
    this.quantity = this.basketService.quantities.length > 0 ? this.basketService.quantities : this.basket.map(x => 1);
    this.totalAmount = 0;
    this.calculateTotal();
    
  }

  back(): void {
    this.navigationService.back();
  }

  public removeFromBasket(product: Product): void {
    this.basketService.removeFromBasket(product);
    this.basket = this.basketService.getContent();
  }

  public trackProductByIndex(index: number): number {
    return index;
  }

  public navigateToCheckout(): void {
    this.routerService.navigateTo('checkout');
  }

  public calculateTotal(): void {

    let t = 0;

    for(let i = 0; i < this.basket.length; i++){

      t += (this.basket[i].price * this.quantity[i]);

    }

    this.totalAmount = t;

    this.basketService.quantities = this.quantity;

  }

}
