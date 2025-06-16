export interface ProductProps {
    id: string;
    name: string;
    price: number;
    images: string[];
    categoryId: string;
    categoryName: string;
    createAt: string;
    label?: string; // Optional
}