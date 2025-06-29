'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react"
import { toast } from "sonner"

import BreadcrumbNav from '../components/ui/breadcrumb-nav'
import { useCartStore } from '../stores/cartStore'
import { useAuthStore } from '../stores/authStore'
import { Order, orderService, userProfileService } from "./service/service"
import CartItem from '../components/cart_components/cartitem'

interface CustomerInfo {
  customerName: string
  customerPhone: string
  deliveryAddress: string
  email: string
  paymentMethod: 'STRIPE' | 'COD'
}

export default function CartPage() {
  const router = useRouter()
  const items = useCartStore(state => state.items)
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const removeItem = useCartStore(state => state.removeItem)
  const isLoggedIn = useAuthStore(state => state.isLogin)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const [activeTab, setActiveTab] = useState("cart")
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    customerName: "",
    customerPhone: "",
    deliveryAddress: "",
    email: "",
    paymentMethod: "COD"
  })

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = 20000
  const total = subtotal + shipping

  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Giỏ hàng" }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    updateQuantity(id, quantity)
  }

  const handleRemoveItem = (id: string) => {
    removeItem(id)
  }

  const handleCustomerInfoChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const fetchUserProfile = async () => {
    if (!isLoggedIn()) {
      toast.error('Vui lòng đăng nhập để tự động điền thông tin')
      return
    }

    setIsLoadingProfile(true)
    try {
      const userData = await userProfileService.getUserProfile()

      // Pre-fill customer info with user profile data
      setCustomerInfo({
        customerName: userData.name || userData.fullName || "",
        customerPhone: userData.phone || "",
        deliveryAddress: userData.address || "",
        email: userData.email || userData.gmail || "",
        paymentMethod: "COD"
      })

      toast.success('Đã tải thông tin hồ sơ thành công!')
    } catch (error) {
      console.error('Error fetching user profile:', error)
      toast.error('Không thể tải thông tin hồ sơ. Vui lòng điền thủ công.')
    } finally {
      setIsLoadingProfile(false)
    }
  }

  const validateCustomerInfo = (): boolean => {
    const requiredFields: (keyof CustomerInfo)[] = ['customerName', 'customerPhone', 'deliveryAddress', 'email']
    const emptyFields = requiredFields.filter(field => !customerInfo[field].trim())

    if (emptyFields.length > 0) {
      const fieldNames: Record<keyof CustomerInfo, string> = {
        customerName: 'Họ và tên',
        customerPhone: 'Số điện thoại',
        deliveryAddress: 'Địa chỉ giao hàng',
        email: 'Email',
        paymentMethod: 'Phương thức thanh toán'
      }
      const missingFields = emptyFields.map(field => fieldNames[field]).join(', ')
      toast.error(`Vui lòng điền đầy đủ các trường: ${missingFields}`)
      return false
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerInfo.email)) {
      toast.error('Vui lòng nhập địa chỉ email hợp lệ')
      return false
    }

    // Basic phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    if (!phoneRegex.test(customerInfo.customerPhone.replace(/\s/g, ''))) {
      toast.error('Vui lòng nhập số điện thoại hợp lệ')
      return false
    }

    return true
  }

  const handleCheckout = async () => {
    if (isLoading) return; // Prevent multiple submissions

    if (!validateCustomerInfo()) {
      return
    }

    try {
      setIsLoading(true)
      // Create order data
      const orderData: Order = {
        userId: "b3b8c7e2-8e2a-4c2a-9e2a-8e2a4c2a9e2a", // Replace with actual user ID from your auth system
        customerName: customerInfo.customerName,
        deliveryAddress: customerInfo.deliveryAddress,
        customerPhone: customerInfo.customerPhone,
        orderItems: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          orderId: "b3b8c7e2-8e2a-4c2a-9e2a-8e2a4c2a9e2a", 
          productName: item.productName,
          productImage: item.productImage
        })),
        orderStatus: "PENDING",
        orderTotal: total.toFixed(2),
        orderPaymentMethod: customerInfo.paymentMethod === 'STRIPE' ? 'CREDIT_CARD' : 'CASH',
        orderPaymentStatus: customerInfo.paymentMethod === 'COD' ? 'PENDING' : 'PENDING',
        orderPaymentDate: new Date().toISOString().split('T')[0],
        orderPaymentAmount: total.toFixed(2)
      }

      // Create order
      const order = await orderService.createOrder(orderData)

      // Create payment
      console.log(order)
      toast.success('Đặt hàng thành công!')
    } catch (error) {
      console.error('Checkout error:', error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      toast.error('Giỏ hàng của bạn đang trống')
      return
    }
    setActiveTab("customer-info")
    // Auto-fetch user profile when switching to customer info tab
    fetchUserProfile()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <BreadcrumbNav items={breadcrumbItems} />

        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="cart" className="space-y-6">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                <div className="lg:col-span-3">
                  <div className="bg-white px-6 py-8 rounded-lg shadow">
                    <h2 className="text-2xl font-semibold mb-6">Giỏ hàng</h2>
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
                        <p className="text-gray-500">Giỏ hàng của bạn đang trống</p>
                        <Button
                          className="mt-4"
                          onClick={() => router.push('/category/thuc-pham-am-thuc')}
                        >
                          Tiếp tục mua sắm
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {items.length > 0 && (
                  <div className="lg:col-span-2">
                    <div className="bg-white px-6 py-8 rounded-lg shadow">
                      <h2 className="text-2xl font-semibold mb-6">Tóm tắt đơn hàng</h2>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Tạm tính</span>
                          <span>{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Phí vận chuyển</span>
                          <span>{formatCurrency(shipping)}</span>
                        </div>
                        <div className="border-t pt-4">
                          <div className="flex justify-between font-semibold">
                            <span>Tổng cộng</span>
                            <span>{formatCurrency(total)}</span>
                          </div>
                        </div>
                        <Button
                          className="w-full mt-6"
                          onClick={handleProceedToCheckout}
                        >
                          Tiến hành thanh toán
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="customer-info" className="space-y-6">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                <div className="lg:col-span-3">
                  <div className="bg-white px-6 py-8 rounded-lg shadow">
                    <h2 className="text-2xl font-semibold mb-6">Thông tin khách hàng</h2>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="customerName">Họ và tên *</Label>
                          <Input
                            id="customerName"
                            value={customerInfo.customerName}
                            onChange={(e) => handleCustomerInfoChange('customerName', e.target.value)}
                            placeholder="Nhập họ và tên của bạn"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="customerPhone">Số điện thoại *</Label>
                          <Input
                            id="customerPhone"
                            value={customerInfo.customerPhone}
                            onChange={(e) => handleCustomerInfoChange('customerPhone', e.target.value)}
                            placeholder="Nhập số điện thoại của bạn"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Địa chỉ email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={customerInfo.email}
                          onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                          placeholder="Nhập địa chỉ email của bạn"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deliveryAddress">Địa chỉ giao hàng *</Label>
                        <Textarea
                          id="deliveryAddress"
                          value={customerInfo.deliveryAddress}
                          onChange={(e) => handleCustomerInfoChange('deliveryAddress', e.target.value)}
                          placeholder="Nhập địa chỉ giao hàng đầy đủ"
                          rows={4}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Phương thức thanh toán *</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {[
                            { value: 'COD', label: 'Thanh toán khi nhận hàng (COD)', desc: 'Thanh toán khi bạn nhận được đơn hàng' },
                            { value: 'STRIPE', label: 'Thẻ ghi nợ Stripe', desc: 'Thanh toán trực tuyến an toàn' }
                          ].map(method => (
                            <Button
                              key={method.value}
                              type="button"
                              variant={customerInfo.paymentMethod === method.value ? 'default' : 'outline'}
                              className="h-auto p-4 flex flex-col items-start space-y-2"
                              onClick={() => handleCustomerInfoChange('paymentMethod', method.value as 'COD' | 'STRIPE')}
                            >
                              <div className="font-medium">{method.label}</div>
                              <div className="text-sm text-muted-foreground">{method.desc}</div>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="bg-white px-6 py-8 rounded-lg shadow">
                    <h2 className="text-2xl font-semibold mb-6">Tóm tắt đơn hàng</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Tạm tính</span>
                        <span>{formatCurrency(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phí vận chuyển</span>
                        <span>{formatCurrency(shipping)}</span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between font-semibold">
                          <span>Tổng cộng</span>
                          <span>{formatCurrency(total)}</span>
                        </div>
                      </div>
                      <div className="space-y-3 mt-6">
                        <Button
                          className="w-full"
                          onClick={handleCheckout}
                          disabled={isLoading}
                        >
                          {isLoading ? 'Đang xử lý...' : 'Hoàn tất đơn hàng'}
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setActiveTab("cart")}
                        >
                          Quay lại giỏ hàng
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 