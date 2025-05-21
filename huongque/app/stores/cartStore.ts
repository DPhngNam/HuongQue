import { create } from 'zustand'
import { CartItem } from '../models/cart'
import { cartItems as initialCartItems } from '../utils/cartData'

interface CartState {
  items: CartItem[]
  totalItems: number
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
  // Initialize with data from cartData.ts
  items: initialCartItems,
  
  // Calculate total items (sum of quantities)
  totalItems: initialCartItems.reduce((total, item) => total + item.quantity, 0),
  
  // Add an item to the cart
  addItem: (item: CartItem) => {
    const { items } = get()
    const existingItem = items.find(i => i.id === item.id)
    
    if (existingItem) {
      // If item exists, update quantity
      const updatedItems = items.map(i => 
        i.id === item.id 
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
  removeItem: (id: string) => {
    const { items } = get()
    const updatedItems = items.filter(item => item.id !== id)
    
    set({ 
      items: updatedItems,
      totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0)
    })
  },
  
  // Update quantity of an item
  updateQuantity: (id: string, quantity: number) => {
    const { items } = get()
    const updatedItems = items.map(item => 
      item.id === id 
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
