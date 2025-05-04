export interface ProductProps {
    id: number;
    name: string;
    label?: string; // Optional label for tags like "10% off" or "New Arrival"
    imageSrc: string;
    imageAlt: string;
    price: string;
    color: string;
}