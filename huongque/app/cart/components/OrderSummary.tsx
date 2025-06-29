'use client'

import { formatCurrency } from '@/app/utils/orderData'
import { Button } from '@/components/ui/button'

interface OrderSummaryProps {
    subtotal: number
    shipping: number
    total: number
    onProceedToCheckout?: () => void
    onCompleteOrder?: () => void
    onBackToCart?: () => void
    isLoading?: boolean
    showCheckoutButton?: boolean
    showCompleteButton?: boolean
    showBackButton?: boolean
}

export default function OrderSummary({ 
    subtotal, 
    shipping, 
    total, 
    onProceedToCheckout,
    onCompleteOrder,
    onBackToCart,
    isLoading = false,
    showCheckoutButton = false,
    showCompleteButton = false,
    showBackButton = false
}: OrderSummaryProps) {
    return (
        <div className="bg-white px-6 py-8 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
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
                
                <div className="space-y-3 mt-6">
                    {showCheckoutButton && onProceedToCheckout && (
                        <Button 
                            className="w-full"
                            onClick={onProceedToCheckout}
                        >
                            Proceed to Checkout
                        </Button>
                    )}
                    
                    {showCompleteButton && onCompleteOrder && (
                        <Button 
                            className="w-full"
                            onClick={onCompleteOrder}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Processing...' : 'Complete Order'}
                        </Button>
                    )}
                    
                    {showBackButton && onBackToCart && (
                        <Button 
                            variant="outline"
                            className="w-full"
                            onClick={onBackToCart}
                        >
                            Back to Cart
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
} 