import { create } from 'zustand'
import { CartItem } from '../models/cart'
import { cartService } from '../cart/service/service'

// Extended CartItem interface to include cartItemId
interface CartItemWithId extends CartItem {
  cartItemId?: string;
}

interface CartState {
  items: CartItemWithId[]
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

// Maximum quantity per item - set to a reasonable high limit
// This prevents abuse while allowing legitimate bulk purchases
const MAX_QUANTITY_PER_ITEM = 99;

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
      const itemsMap = new Map<string, CartItemWithId>();
      
      rawItems.forEach(item => {
        const existingItem = itemsMap.get(item.productId);
        
        if (existingItem) {
          // If quantity would exceed limit, cap it at MAX_QUANTITY_PER_ITEM
          const newQuantity = Math.min(existingItem.quantity + item.quantity, MAX_QUANTITY_PER_ITEM);
          existingItem.quantity = newQuantity;
        } else {
          // Add new item to map with cartItemId
          itemsMap.set(item.productId, {
            productId: item.productId,
            quantity: Math.min(item.quantity, MAX_QUANTITY_PER_ITEM),
            price: item.price,
            productName: item.productName,
            productImage: item.productImage,
            cartItemId: item.cartItemId
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
        // Check if adding would exceed the limit
        const newQuantity = existingItem.quantity + item.quantity;
        if (newQuantity > MAX_QUANTITY_PER_ITEM) {
          set({ 
            error: `Maximum quantity per item is ${MAX_QUANTITY_PER_ITEM}. Cannot add more items.` 
          });
          return;
        }

        // If item exists, update quantity
        const updatedItems = items.map(i =>
          i.productId === item.productId
            ? { ...i, quantity: newQuantity }
            : i
        );

        set({
          items: updatedItems,
          totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0)
        });
      } else {
        // Check if new item quantity exceeds limit
        if (item.quantity > MAX_QUANTITY_PER_ITEM) {
          set({ 
            error: `Maximum quantity per item is ${MAX_QUANTITY_PER_ITEM}. Cannot add more items.` 
          });
          return;
        }

        // If item doesn't exist, add it
        const updatedItems = [...items, item];

        set({
          items: updatedItems,
          totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0)
        });
      }

      // Sync with backend
      await cartService.addCartItem({
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

      // Use cartItemId if available, otherwise use productId as fallback
      const itemIdToRemove = itemToRemove.cartItemId || itemToRemove.productId;
      await cartService.removeCartItem(itemIdToRemove);
      
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

    // Validate quantity limits
    if (quantity > MAX_QUANTITY_PER_ITEM) {
      set({ 
        error: `Maximum quantity per item is ${MAX_QUANTITY_PER_ITEM}. Cannot set quantity to ${quantity}.` 
      });
      return;
    }

    if (quantity < 1) {
      set({ error: "Quantity must be at least 1." });
      return;
    }

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

      // Use cartItemId if available, otherwise use productId as fallback
      const itemIdToUpdate = itemToUpdate.cartItemId || itemToUpdate.productId;
      
      // Sync with backend
      await cartService.updateCartItem({
        cartItemId: itemIdToUpdate,
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
