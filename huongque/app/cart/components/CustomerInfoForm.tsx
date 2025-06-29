'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CustomerInfo } from './types'

interface CustomerInfoFormProps {
    customerInfo: CustomerInfo
    onCustomerInfoChange: (field: keyof CustomerInfo, value: string) => void
}

export default function CustomerInfoForm({ customerInfo, onCustomerInfoChange }: CustomerInfoFormProps) {
    return (
        <div className="bg-white px-6 py-8 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-6">Customer Information</h2>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="customerName">Full Name *</Label>
                        <Input
                            id="customerName"
                            value={customerInfo.customerName}
                            onChange={(e) => onCustomerInfoChange('customerName', e.target.value)}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="customerPhone">Phone Number *</Label>
                        <Input
                            id="customerPhone"
                            value={customerInfo.customerPhone}
                            onChange={(e) => onCustomerInfoChange('customerPhone', e.target.value)}
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => onCustomerInfoChange('email', e.target.value)}
                        placeholder="Enter your email address"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="deliveryAddress">Delivery Address *</Label>
                    <Textarea
                        id="deliveryAddress"
                        value={customerInfo.deliveryAddress}
                        onChange={(e) => onCustomerInfoChange('deliveryAddress', e.target.value)}
                        placeholder="Enter your complete delivery address"
                        rows={4}
                        required
                    />
                </div>
            </div>
        </div>
    )
} 