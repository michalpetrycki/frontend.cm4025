import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/interfaces/product.interface';
import { ApiEndpointsService } from 'src/app/services/api-endpoints.service';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsEndpoint: string;

  constructor(private apiService: ApiService, private apiEndpointsService: ApiEndpointsService, private toastService: ToastService) { 

    this.productsEndpoint = this.apiEndpointsService.getProductsEndpoint();

  }

  async fetchProducts(): Promise<Product[]>{

    return new Promise<Product[]>(async (resolve, reject) => {

      this.apiService.get(this.productsEndpoint, { observe: 'response' })
      .subscribe({

        next: async(response: HttpResponse<object>) => {

          if (response.ok && response.status === 200 && response.statusText === 'OK'){

            const responseBody = response.body!;
  
            const responseArray = Object.values(responseBody);
            const products = responseArray[0] as Product[];
            
            resolve(products);
  
          }
          else {
            resolve([]);
          }

        },
        error: (error: HttpErrorResponse) => {
          this.toastService.showError(error);
          reject(false);
        }

      });

    });

  }

  async createProduct(newProduct: Product): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {

      this.apiService.post(this.productsEndpoint, newProduct, { observe: 'response' })
      .subscribe({

        next: async(response: HttpResponse<object>) => {

          // Status 201 - new resource created
          if (response.ok && response.status === 201){

            const responseBody = response.body!;
  
            const responseArray = Object.values(responseBody);
            const newProduct = responseArray[0] as Product;

            this.toastService.showSuccess('New product successfully created');
            
            resolve(newProduct !== null && newProduct !== undefined);
  
          }

        },
        error: (error: HttpErrorResponse) => {
          this.toastService.showError(error);
          reject(false);
        }

      });

    });

  }

  async updateProduct(newProduct: Product): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {

      this.apiService.patch(this.productsEndpoint, newProduct, { observe: 'response' })
      .subscribe({

        next: async(response: HttpResponse<object>) => {

          // Status 201 - resource updated
          if (response.ok && response.status === 201){

            const responseBody = response.body!;
  
            const responseArray = Object.values(responseBody);
            const newProduct = responseArray[0] as Product;

            this.toastService.showSuccess('Product successfully edited');
            
            resolve(newProduct !== null && newProduct !== undefined);
  
          }

        },
        error: (error: HttpErrorResponse) => {
          this.toastService.showError(error);
          reject(false);
        }

      });

    });

  }

  async deleteProduct(product: Product): Promise<boolean> {

    debugger;

    return new Promise<boolean>((resolve, reject) => {

      this.apiService.delete(this.productsEndpoint, { observe: 'response', body: { _id: product._id} })
      .subscribe({

        next: async(response: HttpResponse<object>) => {

          // Status 204 - existing resource successfully removed
          if (response.ok && response.status === 204){

            this.toastService.showSuccess('Product successfully deleted');
            
            resolve(true);
  
          }

        },
        error: (error: HttpErrorResponse) => {
          this.toastService.showError(error);
          reject(false);
        }

      });

    });

  }

}
