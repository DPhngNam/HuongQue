export interface CartItem {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    productImage: string;
}

export interface Cart {
    items: CartItem[];
    total: number;
} 