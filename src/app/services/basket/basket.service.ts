import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/interfaces/product.interface';
import { ToastService } from 'src/app/services/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private basket: Product[];
  quantities: number[];

  constructor(private toastService: ToastService) { 

    this.basket = [];
    this.quantities = [];

  }

  public addToBasket(product: Product): void {

    const existingItem = this.basket.find(x => x._id === product._id);

    // Item already in the basket
    if (existingItem){
      this.toastService.showError(`${product.name} already in basket`);
    }
    else{
      this.basket.push(product);
      this.quantities?.push(1);
      this.toastService.showSuccess(`${product.name} added to basket`);
    }
    
  }

  // Removes item from the basket by returning all items which _id is different than of removed item
  public removeFromBasket(product: Product): void {

    this.basket = this.basket.filter(x => x._id !== product._id);
    this.toastService.showSuccess(`${product.name} removed from basket`);

  }

  // Returns basket - array of products
  public getContent(): Product[] {
    return this.basket;
  }

}
