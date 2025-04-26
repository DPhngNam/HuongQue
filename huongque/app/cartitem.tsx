'use client'

import Image from 'next/image'
import { CartItem as CartItemType } from '@/app/models/cart'
import { X } from 'lucide-react'

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
    const handleIncrement = () => {
        onUpdateQuantity(item.id, item.quantity + 1);
    };

    const handleDecrement = () => {
        if (item.quantity > 1) {
            onUpdateQuantity(item.id, item.quantity - 1);
        }
    };

    return (
        <div className="flex items-center gap-4 py-4 border-b">
            <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-gray-100">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex flex-1 flex-col">
                <div className="flex justify-between">
                    <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                    <button
                        onClick={() => onRemove(item.id)}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <p className="mt-1 text-sm font-medium text-gray-900">${item.price}</p>
                
                <div className="mt-2 flex items-center gap-2">
                    <button
                        onClick={handleDecrement}
                        className="rounded-md border px-2 py-1 text-sm"
                        disabled={item.quantity <= 1}
                    >
                        -
                    </button>
                    <span className="min-w-[2rem] text-center">{item.quantity}</span>
                    <button
                        onClick={handleIncrement}
                        className="rounded-md border px-2 py-1 text-sm"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    )
} 