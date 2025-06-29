'use client'

import { Tabs, TabsContent } from '@/components/ui/tabs'
import CartItemsSection from './CartItemsSection'
import CustomerInfoForm from './CustomerInfoForm'
import OrderSummary from './OrderSummary'
import { CartItem as CartItemType } from '@/app/models/cart'
import { CustomerInfo } from './types'

interface CartTabsProps {
    activeTab: string
    setActiveTab: (tab: string) => void
    items: CartItemType[]
    customerInfo: CustomerInfo
    subtotal: number
    shipping: number
    total: number
    isLoading: boolean
    onUpdateQuantity: (id: string, quantity: number) => void
    onRemove: (id: string) => void
    onCustomerInfoChange: (field: keyof CustomerInfo, value: string) => void
    onProceedToCheckout: () => void
    onCompleteOrder: () => void
    onBackToCart: () => void
}

export default function CartTabs({
    activeTab,
    setActiveTab,
    items,
    customerInfo,
    subtotal,
    shipping,
    total,
    isLoading,
    onUpdateQuantity,
    onRemove,
    onCustomerInfoChange,
    onProceedToCheckout,
    onCompleteOrder,
    onBackToCart
}: CartTabsProps) {
    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="cart" className="space-y-6">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                    <div className="lg:col-span-3">
                        <CartItemsSection
                            items={items}
                            onUpdateQuantity={onUpdateQuantity}
                            onRemove={onRemove}
                        />
                    </div>

                    {items.length > 0 && (
                        <div className="lg:col-span-2">
                            <OrderSummary
                                subtotal={subtotal}
                                shipping={shipping}
                                total={total}
                                onProceedToCheckout={onProceedToCheckout}
                                showCheckoutButton={true}
                            />
                        </div>
                    )}
                </div>
            </TabsContent>

            <TabsContent value="customer-info" className="space-y-6">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                    <div className="lg:col-span-3">
                        <CustomerInfoForm
                            customerInfo={customerInfo}
                            onCustomerInfoChange={onCustomerInfoChange}
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <OrderSummary
                            subtotal={subtotal}
                            shipping={shipping}
                            total={total}
                            onCompleteOrder={onCompleteOrder}
                            onBackToCart={onBackToCart}
                            isLoading={isLoading}
                            showCompleteButton={true}
                            showBackButton={true}
                        />
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    )
} 