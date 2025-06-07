'use client'

import { useRouter } from 'next/navigation'
import CartItem from '../cartitem'
import BreadcrumbNav from '../components/ui/breadcrumb-nav'
import { Button } from '@/components/ui/button'
import { useCartStore } from '../stores/cartStore'

export default function CartPage() {
    const router = useRouter()
    const items = useCartStore(state => state.items)
    const updateQuantity = useCartStore(state => state.updateQuantity)
    const removeItem = useCartStore(state => state.removeItem)
    
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = 15
    const total = subtotal + shipping

    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Cart" }
    ]

    const handleUpdateQuantity = (id: string, quantity: number) => {
        updateQuantity(id, quantity)
    }

    const handleRemoveItem = (id: string) => {
        removeItem(id)
    }

    const handleCheckout = () => {
        router.push('/payment')
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
                <BreadcrumbNav items={breadcrumbItems} />
                
                <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                    <div className="lg:col-span-3">
                        <div className="bg-white px-6 py-8 rounded-lg shadow">
                            <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
                            {items.length > 0 ? (
                                <div className="divide-y">
                                    {items.map((item) => (
                                        <CartItem
                                            key={item.id}
                                            item={item}
                                            onUpdateQuantity={handleUpdateQuantity}
                                            onRemove={handleRemoveItem}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">Your cart is empty</p>
                                    <Button 
                                        className="mt-4"
                                        onClick={() => router.push('/products')}
                                    >
                                        Continue Shopping
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {items.length > 0 && (
                        <div className="lg:col-span-2">
                            <div className="bg-white px-6 py-8 rounded-lg shadow">
                                <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between font-semibold">
                                            <span>Total</span>
                                            <span>${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <Button 
                                        className="w-full mt-6"
                                        onClick={handleCheckout}
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
} 