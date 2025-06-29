'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import CartItem from '../../components/cart_components/cartitem'
import { CartItem as CartItemType } from '@/app/models/cart'

interface CartItemsSectionProps {
    items: CartItemType[]
    onUpdateQuantity: (id: string, quantity: number) => void
    onRemove: (id: string) => void
}

export default function CartItemsSection({ items, onUpdateQuantity, onRemove }: CartItemsSectionProps) {
    const router = useRouter()

    return (
        <div className="bg-white px-6 py-8 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
            {items.length > 0 ? (
                <div className="divide-y">
                    {items.map((item) => (
                        <CartItem
                            key={item.productId}
                            item={item}
                            onUpdateQuantity={onUpdateQuantity}
                            onRemove={onRemove}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 w-full">
                    <p className="text-gray-500">Your cart is empty</p>
                    <Button 
                        className="mt-4"
                        onClick={() => router.push('/category/thuc-pham-am-thuc')}
                    >
                        Continue Shopping
                    </Button>
                </div>
            )}
        </div>
    )
} 