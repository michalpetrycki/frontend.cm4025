import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/interfaces/product.interface';
import { ProductService } from 'src/app/services/product/product.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { ToastService } from 'src/app/services/toast/toast.service';

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
  basket: Product[];

  constructor(private productService: ProductService, private spinnerService: SpinnerService, private toastService: ToastService) { 

    this.spinnerService.showSpinner();
    this.products = [];

    this.sortOptions = [
      {label: 'Price High to Low', value: '!price'},
      {label: 'Price Low to High', value: 'price'}
    ];

    this.sortField = '';
    this.sortOrder = -1;
    this.basket = [];

  }

  async ngOnInit(): Promise<void> {

    await this.fetchProducts();
    this.spinnerService.hideSpinner();

  }

  public async fetchProducts(): Promise<void>{

    return new Promise<void>(async(resolve, reject) => {

      this.products = await this.productService.fetchProducts();
      resolve();

    });

  }

  public onSortChange(event: any) {
    let value = event.value;

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

    this.basket.push(product);
    this.toastService.showSuccess('Basket updated');

  }

}

interface SelectItem<T = any> {
  label?: string;
  value: T;
}