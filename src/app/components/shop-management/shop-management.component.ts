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
  productToDelete: Product | undefined;
  columns: TableColumn[];
  displayConfirmationDialog: boolean;
  // confirmDeletion: boolean;

  constructor(private spinnerService: SpinnerService, private productService: ProductService) {

    this.spinnerService.showSpinner();

    this.displayProductModal = false;
    this.displayConfirmationDialog = false;
    this.isCreationMode = true;
    this.productFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      rating: new FormControl(''),
      quantity: new FormControl(''),
      imagePath: new FormControl('')
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
    this.productToDelete = undefined;

    this.columns = [
      { header: 'Image' },
      { header: 'Name' },
      { header: 'Category' },
      { header: 'Quantity' },
      { header: 'Inventory Status' },
      { header: 'Price' },
      { header: 'Edit' },
      { header: 'Delete' }
    ];

    // this.confirmDeletion = false;

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
        rating: product.rating,
        quantity: product.quantity ?? 0,
        imagePath: product.imagePath
      });

      this.productToEdit = product;

    }

  }

  public closeProductCreationModal(): void {
    this.displayProductModal = false;
    this.productFormGroup.reset();
  }

  private async fetchProducts(): Promise<void> {

    return new Promise<void>(async (resolve) => {

      this.products = await this.productService.fetchProducts();      
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

      const productQuantity = Number(this.productFormGroup.get('quantity')?.value) ?? 0;
    
      const newProduct: Product = {
        name: this.productFormGroup.get('name')?.value,
        category: this.productFormGroup.get('category')?.value,
        price: Number(this.productFormGroup.get('price')?.value),
        inventoryStatus: this.getInventoryStatus(productQuantity),
        rating: Number('0.0'),
        quantity: productQuantity,
        imagePath: this.productFormGroup.get('imagePath')?.value
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

      const quantity = Number(this.productFormGroup.get('quantity')?.value);
    
      const productToUpdate: Product = {
        _id: this.productToEdit?._id,
        name: this.productFormGroup.get('name')?.value,
        category: this.productFormGroup.get('category')?.value,
        price: this.productFormGroup.get('price')?.value ?? 0.0,
        quantity: quantity ?? 0,
        inventoryStatus: this.getInventoryStatus(quantity),
        imagePath: this.productFormGroup.get('imagePath')?.value
      };

      debugger;

      await this.productService.updateProduct(productToUpdate);
      this.productFormGroup.reset();
      this.closeProductCreationModal();
      await this.fetchProducts();
      this.spinnerService.hideSpinner();

      this.productToEdit = undefined;

      resolve();

    });

  }

  public openConfirmationDialog(product: Product): void {
    this.displayConfirmationDialog = true;
    this.productToDelete = product;
  }

  public hideonfirmationDialog(): void {
    this.displayConfirmationDialog = false;
  }

  public confirmDeletion(): void {
    this.deleteProduct();
    this.displayConfirmationDialog = false;
    this.productToDelete = undefined;
  }

  public cancelDeletion(): void {
    this.productToDelete = undefined;
    this.displayConfirmationDialog = false;
  }

  public async deleteProduct(): Promise<void> {

    return new Promise<void>(async(resolve, reject) => {

      this.spinnerService.showSpinner();

      const success = await this.productService.deleteProduct(this.productToDelete!);

      // If product has been deleted
      if (success) {
        this.fetchProducts();
      }
      
      this.spinnerService.hideSpinner();

      resolve();

    });
    
  }

  private getInventoryStatus(quantity: number): 'OUTOFSTOCK' | 'LOWSTOCK' | 'INSTOCK' {

    switch (true) {

      case quantity === 0: {
        return 'OUTOFSTOCK';
      }
      case quantity < 5: {
        return 'LOWSTOCK';
      }
      default: {
        return 'INSTOCK'
      }

    }

  }

}

interface CategoryDropdownOption {
  name: string;
  code: string;
}

interface TableColumn {
  header: string;
}