import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/interfaces/product.interface';
import { ProductService } from 'src/app/services/product/product.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-shop-management',
  templateUrl: './shop-management.component.html',
  styleUrls: ['./shop-management.component.sass']
})
export class ShopManagementComponent implements OnInit {

  displayProductModal: boolean;
  isCreationMode: boolean;
  productFormGroup: FormGroup;
  categories: CategoryDropdownOption[];
  selectedCategory: CategoryDropdownOption | undefined;
  products: Product[];
  productToEdit: Product | undefined;
  columns: TableColumn[];

  constructor(private spinnerService: SpinnerService, private productService: ProductService) {

    this.spinnerService.showSpinner();

    this.displayProductModal = false;
    this.isCreationMode = true;
    this.productFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      rating: new FormControl('')
    });
    
    this.selectedCategory = undefined;

    this.categories = [
      { name: 'Option 1', code: 'O1' },
      { name: 'Option 2', code: 'O2' },
      { name: 'Option 3', code: 'O3' },
      { name: 'Option 4', code: 'O4' },
    ];

    this.products = [];
    this.productToEdit = undefined;

    this.columns = [
      { header: 'Image' },
      { header: 'Name' },
      { header: 'Category' },
      { header: 'Price' },
      { header: 'Edit' },
      { header: 'Delete' }
    ];

  }

  async ngOnInit(): Promise<void> {

    await this.fetchProducts();
    this.spinnerService.hideSpinner();

  }

  public openProductModal(creationMode: boolean, product?: Product): void {
    this.displayProductModal = true;
    this.isCreationMode = creationMode;

    if (product){

      this.productFormGroup.setValue({
        name: product.name,
        category: product.category,
        price: product.price,
        rating: product.rating
      });

      this.productToEdit = product;

    }

  }

  public closeProductCreationModal(): void {
    this.displayProductModal = false;
  }

  private async fetchProducts(): Promise<void> {

    return new Promise<void>(async (resolve) => {

      this.products = await this.productService.fetchProducts();

      // this.canDisplayEditArea = this.posts.map(s => false);
      // this.canDisplayEditButton = this.posts.map(s => true);
      // this.editForms = this.posts.map(fg => new FormGroup({ content: new FormControl('', [ Validators.required ]) }));
      
      resolve();

    });
    
  }

  public performModalAction(): Promise<void> {

    return new Promise<void>(async (resolve, reject) => {

      if (this.isCreationMode){
        await this.createProduct();
      }
      else {
        this.updateProduct();
      }

      resolve();

    });

  }

  private async createProduct(): Promise<void> {

    return new Promise<void>(async (resolve, reject) => {

      this.spinnerService.showSpinner();
    
      const newProduct: Product = {
        name: this.productFormGroup.get('name')?.value,
        category: this.productFormGroup.get('category')?.value,
        price: Number(this.productFormGroup.get('price')?.value).toFixed(2),
        rating: this.productFormGroup.get('rating')?.value ?? '0.0'
      };

      await this.productService.createProduct(newProduct);
      this.productFormGroup.reset();
      await this.fetchProducts();
      this.spinnerService.hideSpinner();

      resolve();

    });

  }

  private async updateProduct(): Promise<void> {
    
    return new Promise<void>(async (resolve, reject) => {

      this.spinnerService.showSpinner();
    
      const productToUpdate: Product = {
        _id: this.productToEdit?._id,
        name: this.productFormGroup.get('name')?.value,
        category: this.productFormGroup.get('category')?.value,
        price: this.productFormGroup.get('price')?.value,
      };

      await this.productService.updateProduct(productToUpdate);
      this.productFormGroup.reset();
      this.closeProductCreationModal();
      await this.fetchProducts();
      this.spinnerService.hideSpinner();

      this.productToEdit = undefined;

      resolve();

    });

  }

  public async deleteProduct(product: Product): Promise<void> {

    return new Promise<void>(async(resolve, reject) => {

      this.spinnerService.showSpinner();

      const success = await this.productService.deleteProduct(product);

      // If product has been deleted
      if (success) {
        this.fetchProducts();
      }
      
      this.spinnerService.hideSpinner();

      resolve();

    });
    
  }

}

interface CategoryDropdownOption {
  name: string;
  code: string;
}

interface TableColumn {
  header: string;
}