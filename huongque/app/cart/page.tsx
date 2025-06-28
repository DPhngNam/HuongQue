'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from "react"
import { toast } from "sonner"
import CartItem from '../cartitem'
import BreadcrumbNav from '../components/ui/breadcrumb-nav'
import { useCartStore } from '../stores/cartStore'
import { Order, orderService } from "./service/service"

export default function CartPage() {
    const router = useRouter()
    const items = useCartStore(state => state.items)
    const updateQuantity = useCartStore(state => state.updateQuantity)
    const removeItem = useCartStore(state => state.removeItem)
    const [isLoading, setIsLoading] = useState(false)
    
    const subtotal = 10000
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

    const handleCheckout = async () => {
        if (isLoading) return; // Prevent multiple submissions

        try {
            setIsLoading(true)
            // Create order data
            const orderData: Order = {
                userId: "b3b8c7e2-8e2a-4c2a-9e2a-8e2a4c2a9e2a", // Replace with actual user ID from your auth system
                customerName: "Customer Name", // Replace with actual customer data
                deliveryAddress: "Delivery Address", // Replace with actual address
                customerPhone: "Phone Number", // Replace with actual phone
                orderItems: items.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,    
                    price: item.price,
                    orderId: "b3b8c7e2-8e2a-4c2a-9e2a-8e2a4c2a9e2a", // This will be filled by the backend
                    productName: item.productName,
                    productImage: item.productImage
                })),
                orderStatus: "PENDING",
                orderTotal: total.toFixed(2),
                orderPaymentMethod: "CREDIT_CARD",
                orderPaymentStatus: "PENDING",
                orderPaymentDate: new Date().toISOString().split('T')[0],
                orderPaymentAmount: total.toFixed(2)
            }

            // Create order
            const order = await orderService.createOrder(orderData)

            // Create payment
            console.log(order)
        } catch (error) {
            console.error('Checkout error:', error)
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error('An unexpected error occurred. Please try again.')
            }
        } finally {
            setIsLoading(false)
        }
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
                                            key={item.productId}
                                            item={item}
                                            onUpdateQuantity={handleUpdateQuantity}
                                            onRemove={handleRemoveItem}
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
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Processing...' : 'Proceed to Checkout'}
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