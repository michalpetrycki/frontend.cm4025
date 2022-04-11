import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/interfaces/product.interface';
import { BasketService } from 'src/app/services/basket/basket.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass']
})
export class BasketComponent implements OnInit {

  basket: Product[];
  quantity: number[];

  constructor(private navigationService: NavigationService, private basketService: BasketService) { 
    
    this.basket = [];
    this.quantity = [];

  }

  ngOnInit(): void {

    this.loadBasketContent();

  }

  back(): void {
    this.navigationService.back();
  }

  private loadBasketContent(): void {
    this.basket = this.basketService.getContent();
    this.quantity = this.basket.map(x => 1);
  }

  public removeFromBasket(product: Product): void {
    this.basketService.removeFromBasket(product);
    this.basket = this.basketService.getContent();
  }

  public trackProductByIndex(index: number): number {
    return index;
  }

}
