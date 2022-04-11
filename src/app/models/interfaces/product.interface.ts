export interface Product {
    _id?: string;
    name: string;
    category: string;
    price: number;
    imagePath?: string;
    inventoryStatus?: 'OUTOFSTOCK' | 'INSTOCK' | 'LOWSTOCK';
    rating?: number;
    quantity?: number;
}