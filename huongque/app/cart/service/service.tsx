import axiosInstance from "@/lib/axiosInstance";
import { StringDecoder } from "node:string_decoder";


// Types
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  productName: string;
  productImage: string;
}

export interface Order {
  customerName: string;
  deliveryAddress: string;
  customerPhone: string;
  orderItems: OrderItem[];
  orderStatus: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  orderTotal: number;
  orderPaymentMethod: 'CASH' | 'CREDIT_CARD' | 'BANK_TRANSFER';
  orderPaymentStatus: 'PAID' | 'PENDING' | 'FAILED';
  orderPaymentDate: string;
  orderPaymentAmount: number;
}

export interface PaymentResponse {
  orderId: string;
  paymentUrl: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
}

export interface OrderCreateResponse {
  data: PaymentResponse;
  status: number;
  statusText: string;
}

// Cart Types
export interface CartItemDto {
  cartItemId: string;
  productId: string;
  quantity: number;
  price: number;
  productName: string;
  productImage: string;
}

export interface CartDto {
  cartId: string;
  userId: number;
  cartItems: CartItemDto[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCartItemDto {
  productId: string;
  quantity: number;
  price: number;
  productName: string;
  productImage: string;
}

export interface UpdateCartItemDto {
  cartItemId: string;
  quantity: number;
}

// axiosInstance endpoints
const axiosInstance_BASE_URL = 'http://localhost:8080/orderservice/api/';



// Service functions
export const orderService = {
  url: axiosInstance_BASE_URL + 'orders',
  // Get all orders
  // Create a new order
  createOrder: async (orderData: Order): Promise<OrderCreateResponse> => {
    try {
      const response = await axiosInstance.post(orderService.url ,orderData);
      console.log(response);

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  
  // Get order by ID
  getOrderById: async (orderId: string): Promise<Order> => {
    try {
      const response = await axiosInstance.get(`${orderService.url}/${orderId}`);
      return response.data;
    } catch (error) {
      
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (orderId: string, status: Order['orderStatus']): Promise<Order> => {
    try {
      const response = await axiosInstance.patch(`/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
     
      throw error;
    }
  },

  // Update payment status
  updatePaymentStatus: async (
    orderId: string,
    paymentStatus: Order['orderPaymentStatus']
  ): Promise<Order> => {
    try {
      const response = await axiosInstance.patch(`/orders/${orderId}/payment`, {
        paymentStatus,
      });
      return response.data;
    } catch (error) {
      
      throw error;
    }
  },

  // Get orders by user ID
  getOrdersByUserId: async (userId: string): Promise<Order[]> => {
    try {
      const response = await axiosInstance.get(`/orders/user/${userId}`);
      return response.data;
    } catch (error) {
      
      throw error;
    }
  },

  // Cancel order
  cancelOrder: async (orderId: string): Promise<Order> => {
    try {
      const response = await axiosInstance.post(`/orders/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      
      throw error;
    }
  },
};

// User Profile Service
export const userProfileService = {
  // Get current user profile
  getUserProfile: async () => {
    try {
      const response = await axiosInstance.get("/userservice/users/me");
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },
};

export const cartService = {
  url: axiosInstance_BASE_URL + 'cart',
  // Get cart by user ID
  getCartByUserId: async (): Promise<CartDto | null> => {
    try {
      const response = await axiosInstance.get(`${cartService.url}/user`);
      console.log(response);
      return response.data;
    } catch (error: any) {
     
      if (error.response?.status === 404) {
        return null;
      }
      return null;
    }
  },

  // Create a new cart for user
  createCart: async (): Promise<CartDto> => {
    try {
      const response = await axiosInstance.post(`${cartService.url}/user`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Delete cart by cart ID
  deleteCart: async (cartId: string): Promise<void> => {
    try {
      await axiosInstance.delete(`${cartService.url}/${cartId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Add item to cart
  addCartItem: async (createCartItemDto: CreateCartItemDto): Promise<CartItemDto> => {
    try {
      const response = await axiosInstance.post(`${cartService.url}/user/items`, createCartItemDto);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Update cart item quantity
  updateCartItem: async (updateCartItemDto: UpdateCartItemDto): Promise<CartItemDto> => {
    try {
      const response = await axiosInstance.put(`${cartService.url}/user/items`, updateCartItemDto);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Remove item from cart by cart item ID
  removeCartItem: async (cartItemId: string): Promise<void> => {
    try {
      await axiosInstance.delete(`${cartService.url}/user/items/${cartItemId}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Get all cart items for user
  getCartItems: async (): Promise<CartItemDto[]> => {
    try {
      const response = await axiosInstance.get(`${cartService.url}/user/items`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

}