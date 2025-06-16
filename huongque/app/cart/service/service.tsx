import axios from 'axios';

// Types
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  orderId: string;
  productName: string;
  productImage: string;
}

export interface Order {
  userId: string;
  customerName: string;
  deliveryAddress: string;
  customerPhone: string;
  orderItems: OrderItem[];
  orderStatus: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  orderTotal: string;
  orderPaymentMethod: 'CASH' | 'CREDIT_CARD' | 'BANK_TRANSFER';
  orderPaymentStatus: 'PAID' | 'PENDING' | 'FAILED';
  orderPaymentDate: string;
  orderPaymentAmount: string;
}

export interface PaymentResponse {
  orderId: string;
  paymentUrl: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
}

// API endpoints
const API_BASE_URL = 'http://localhost:8080/orderservice/api/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
});

// Add request interceptor for error handling
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error;
  }
);

// Service functions
export const orderService = {
  // Create a new order
  createOrder: async (orderData: Order)=> {
    try {
      const response = await api.post('/orders',orderData);
      console.log(response);

      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  
  // Get order by ID
  getOrderById: async (orderId: string): Promise<Order> => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (orderId: string, status: Order['orderStatus']): Promise<Order> => {
    try {
      const response = await api.patch(`/orders/${orderId}/status`, { status });
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
      const response = await api.patch(`/orders/${orderId}/payment`, {
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
      const response = await api.get(`/orders/user/${userId}`);
      return response.data;
    } catch (error) {
      
      throw error;
    }
  },

  // Cancel order
  cancelOrder: async (orderId: string): Promise<Order> => {
    try {
      const response = await api.post(`/orders/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      
      throw error;
    }
  },
};
