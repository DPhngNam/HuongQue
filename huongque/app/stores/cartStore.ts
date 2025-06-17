import { create } from 'zustand'
import { CartItem } from '../models/cart'
import { cartItems } from '../utils/cartData'

interface CartState {
  items: CartItem[]
  totalItems: number
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
  // Initialize with data from cartData.ts
  items: cartItems,
  
  // Calculate total items (sum of quantities)
  totalItems: cartItems.reduce((total, item) => total + item.quantity, 0),
  
  // Add an item to the cart
  addItem: (item: CartItem) => {
    const { items } = get()
    const existingItem = items.find(i => i.productId === item.productId)
    
    if (existingItem) {
      // If item exists, update quantity
      const updatedItems = items.map(i => 
        i.productId === item.productId 
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      )
      
      set({ 
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0)
      })
    } else {
      // If item doesn't exist, add it
      const updatedItems = [...items, item]
      
      set({ 
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0)
      })
    }
  },
  
  // Remove an item from the cart
  removeItem: (productId: string) => {
    const { items } = get()
    const updatedItems = items.filter(item => item.productId !== productId)
    
    set({ 
      items: updatedItems,
      totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0)
    })
  },
  
  // Update quantity of an item
  updateQuantity: (productId: string, quantity: number) => {
    const { items } = get()
    const updatedItems = items.map(item => 
      item.productId === productId 
        ? { ...item, quantity: quantity }
        : item
    )
    
    set({ 
      items: updatedItems,
      totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0)
    })
  },
  
  // Clear the cart
  clearCart: () => {
    set({ items: [], totalItems: 0 })
  }
}))
