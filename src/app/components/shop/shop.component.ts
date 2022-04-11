import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/interfaces/product.interface';
import { BasketService } from 'src/app/services/basket/basket.service';
import { ProductService } from 'src/app/services/product/product.service';
import { RouterService } from 'src/app/services/router/router.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.sass']
})
export class ShopComponent implements OnInit {

  products: Product[];
  sortOptions: SelectItem[];
  sortField: string;
  sortOrder: number;

  constructor(private productService: ProductService, private spinnerService: SpinnerService, 
    private basketService: BasketService, private routerService: RouterService) { 

    this.spinnerService.showSpinner();
    this.products = [];

    this.sortOptions = [
      {label: 'Price High to Low', value: '!price'},
      {label: 'Price Low to High', value: 'price'}
    ];

    this.sortField = '';
    this.sortOrder = -1;

  }

  async ngOnInit(): Promise<void> {

    await this.fetchProducts();
    this.spinnerService.hideSpinner();

  }

  public async fetchProducts(): Promise<void>{

    return new Promise<void>(async(resolve) => {

      this.products = await this.productService.fetchProducts();
      resolve();

    });

  }

  public onSortChange(event: any): void {

    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  public addToBasket(product: Product): void {
    this.basketService.addToBasket(product);
  }

  public navigateToBasket(): void {
    this.routerService.navigateTo('basket');
  };

}

interface SelectItem<T = any> {
  label?: string;
  value: T;
}
