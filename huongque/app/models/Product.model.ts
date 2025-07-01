export interface ProductProps {
    id: string;
    tenantId?: string; // Optional, if not available
    name: string;
    price: number;
    images: string[];
    categoryId: string;
    categoryName: string;
    createAt: string;
    label?: string; // Optional
}