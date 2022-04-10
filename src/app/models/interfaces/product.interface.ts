export interface Product {
    _id?: string;
    name: string;
    category: string;
    price: string;
    imagePath?: string;
    inventoryStatus?: 'OUTOFSTOCK' | 'INSTOCK' | 'LOWSTOCK';
    rating?: number;
    quantity?: number;
}