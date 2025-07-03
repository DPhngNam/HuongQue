import { create } from 'zustand'
import { CartItem } from '../models/cart'
import { cartService } from '../cart/service/service'
import { jwtDecode } from 'jwt-decode'
import { MyJwtPayload } from '../settings/[tabs]/Registration'

interface CartState {
  items: CartItem[]
  totalItems: number
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchCartItems: () => Promise<void>
  addItem: (item: CartItem) => Promise<void>
  removeItem: (productId: string) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  clearCart: () => void
}


export const useCartStore = create<CartState>((set, get) => ({
  // Synchronous state properties
  items: [],
  totalItems: 0,
  isLoading: false,
  error: null,

  // Async action to fetch cart items
  fetchCartItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const cartData = await cartService.getCartByUserId();
      const rawItems = cartData?.cartItems || [];
      const itemsMap = new Map<string, CartItem>();
      rawItems.forEach(item => {
        const existingItem = itemsMap.get(item.productId);
        
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          // Add new item to map
          itemsMap.set(item.productId, {
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            productName: item.productName,
            productImage: item.productImage
          });
        }
      });
      
      // Convert map values back to array
      const items = Array.from(itemsMap.values());
      const totalItems = items.reduce((total, item) => total + item.quantity, 0);
      set({ 
        items, 
        totalItems,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : "Failed to fetch cart items",
        isLoading: false 
      });
    }
  },

  // Add an item to the cart
  addItem: async (item: CartItem) => {
    

    const { items } = get();
    const existingItem = items.find(i => i.productId === item.productId);

    try {
      if (existingItem) {
        // If item exists, update quantity
        const updatedItems = items.map(i =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );

        set({
          items: updatedItems,
          totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0)
        });
      } else {
        // If item doesn't exist, add it
        const updatedItems = [...items, item];

        set({
          items: updatedItems,
          totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0)
        });
      }

      // Sync with backend
      await cartService.addCartItem( {
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        productName: item.productName,
        productImage: item.productImage
      });
      
      console.log("Item added to cart successfully");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      set({ error: error instanceof Error ? error.message : "Failed to add item to cart" });
      // Optionally revert the optimistic update
      get().fetchCartItems();
    }
  },

  // Remove an item from the cart
  removeItem: async (productId: string) => {
    

    const { items } = get();
    const itemToRemove = items.find(item => item.productId === productId);
    
    if (!itemToRemove) return;

    try {
      const updatedItems = items.filter(item => item.productId !== productId);

      set({
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0)
      });

      // Sync with backend - you'll need to implement this method in cartService
      await cartService.removeCartItem(itemToRemove.productId);
      
      console.log("Item removed from cart successfully");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      set({ error: error instanceof Error ? error.message : "Failed to remove item from cart" });
      // Revert the optimistic update
      get().fetchCartItems();
    }
  },

  // Update quantity of an item
  updateQuantity: async (productId: string, quantity: number) => {
    

    const { items } = get();
    const itemToUpdate = items.find(item => item.productId === productId);
    
    if (!itemToUpdate) return;

    try {
      const updatedItems = items.map(item =>
        item.productId === productId
          ? { ...item, quantity: quantity }
          : item
      );

      set({
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0)
      });

      // Sync with backend
      await cartService.updateCartItem({
        cartItemId: itemToUpdate.productId,
        quantity: quantity
      });
      
      console.log("Item quantity updated successfully");
    } catch (error) {
      console.error("Error updating item quantity:", error);
      set({ error: error instanceof Error ? error.message : "Failed to update item quantity" });
      // Revert the optimistic update
      get().fetchCartItems();
    }
  },

  // Clear the cart
  clearCart: () => {
    set({ items: [], totalItems: 0 });
  }
}));
