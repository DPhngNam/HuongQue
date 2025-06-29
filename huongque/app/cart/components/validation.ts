import { CustomerInfo } from './types'
import { toast } from 'sonner'

export const validateCustomerInfo = (customerInfo: CustomerInfo): boolean => {
    const requiredFields: (keyof CustomerInfo)[] = ['customerName', 'customerPhone', 'deliveryAddress', 'email']
    const emptyFields = requiredFields.filter(field => !customerInfo[field].trim())
    
    if (emptyFields.length > 0) {
        toast.error(`Please fill in all required fields: ${emptyFields.join(', ')}`)
        return false
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerInfo.email)) {
        toast.error('Please enter a valid email address')
        return false
    }
    
    // Basic phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    if (!phoneRegex.test(customerInfo.customerPhone.replace(/\s/g, ''))) {
        toast.error('Please enter a valid phone number')
        return false
    }
    
    return true
} 