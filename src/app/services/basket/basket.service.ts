import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/interfaces/product.interface';
import { ToastService } from 'src/app/services/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  basket: Product[];

  constructor(private toastService: ToastService) { 

    this.basket = [];

  }

  public addToBasket(product: Product): void {
    this.basket.push(product);
    this.toastService.showSuccess(`${product.name} added to basket`);
  }

  public removeFromBasket(product: Product): void {

    this.toastService.showSuccess(`${product.name} removed from basket`)

  }

}
