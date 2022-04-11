import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/interfaces/product.interface';
import { ToastService } from 'src/app/services/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private basket: Product[];

  constructor(private toastService: ToastService) { 

    this.basket = [];

  }

  public addToBasket(product: Product): void {

    debugger;

    // Item already in the basket
    if (this.basket.indexOf(product) > -1){
      this.toastService.showError(`${product.name} already in basket`);
    }
    else{
      this.basket.push(product);
      this.toastService.showSuccess(`${product.name} added to basket`);
    }
    
  }

  public removeFromBasket(product: Product): void {

    this.basket = this.basket.filter(x => x._id !== product._id);
    this.toastService.showSuccess(`${product.name} removed from basket`);

  }

  public getContent(): Product[] {
    return this.basket;
  }

}
