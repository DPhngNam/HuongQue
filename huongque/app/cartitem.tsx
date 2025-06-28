'use client'

import { CartItem as CartItemType } from '@/app/models/cart'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
    const router = useRouter();
    
    const handleIncrement = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent navigation when clicking the increment button
        onUpdateQuantity(item.productId, item.quantity + 1);
    };

    const handleDecrement = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent navigation when clicking the decrement button
        if (item.quantity > 1) {
            onUpdateQuantity(item.productId, item.quantity - 1);
        }
    };
    
    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent navigation when clicking the remove button
        onRemove(item.productId);
    };
    
    const navigateToProduct = () => {
        router.push(`/shop/${item.productId}?source=cart`);
    };

    return (
        <div 
            className="flex items-center gap-4 py-4 border-b relative cursor-pointer hover:bg-gray-50 transition-colors rounded-lg p-2"
            onClick={navigateToProduct}
        >
            <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-gray-100">
                <Image
                    src={item.productImage}
                    alt="Product Image"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex flex-1 flex-col">
                <div className="flex justify-between">
                    <h3 className="text-base font-medium text-gray-900 hover:text-blue-600">
                        {item.productName}
                    </h3>
                    <button
                        onClick={handleRemove}
                        className="text-gray-400 hover:text-gray-500 z-10"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <p className="mt-1 text-sm font-medium text-gray-900">${item.price}</p>
                
                <div className="mt-2 flex items-center gap-2 z-10" onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={handleDecrement}
                        className="rounded-md border px-2 py-1 text-sm bg-white"
                        disabled={item.quantity <= 1}
                    >
                        -
                    </button>
                    <span className="min-w-[2rem] text-center">{item.quantity}</span>
                    <button
                        onClick={handleIncrement}
                        className="rounded-md border px-2 py-1 text-sm bg-white"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    )
} 