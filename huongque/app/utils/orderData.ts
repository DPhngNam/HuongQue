export type OrderStatus = 'pending' | 'shipping' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  shippingFee: number;
  paymentMethod: string;
  paymentStatus: string;
  shippingInfo: {
    recipientName: string;
    phone: string;
    address: string;
  };
}

export const orders: Order[] = [
  {
    id: '12345',
    date: '20/03/2024',
    status: 'delivered',
    items: [
      {
        id: 'item1',
        name: 'Tên sản phẩm',
        quantity: 2,
        price: 500000,
        image: '/placeholder-product.jpg'
      }
    ],
    totalAmount: 1000000,
    shippingFee: 30000,
    paymentMethod: 'Chuyển khoản',
    paymentStatus: 'Đã thanh toán',
    shippingInfo: {
      recipientName: 'Nguyễn Văn A',
      phone: '0123456789',
      address: '123 Đường ABC, Quận XYZ, TP. HCM'
    }
  },
  {
    id: '12344',
    date: '19/03/2024',
    status: 'shipping',
    items: [
      {
        id: 'item2',
        name: 'Tên sản phẩm',
        quantity: 1,
        price: 300000,
        image: '/placeholder-product.jpg'
      }
    ],
    totalAmount: 300000,
    shippingFee: 30000,
    paymentMethod: 'Chuyển khoản',
    paymentStatus: 'Đã thanh toán',
    shippingInfo: {
      recipientName: 'Nguyễn Văn B',
      phone: '0987654321',
      address: '456 Đường DEF, Quận UVW, TP. HCM'
    }
  }
];

export const getOrderById = (orderId: string): Order | undefined => {
  return orders.find(order => order.id === orderId);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  }).format(amount);
};

export const getStatusInfo = (status: OrderStatus) => {
  switch (status) {
    case 'delivered':
      return {
        text: 'Đã giao',
        color: 'text-green-600',
        icon: 'CheckCircle2'
      };
    case 'shipping':
      return {
        text: 'Đang giao',
        color: 'text-blue-600',
        icon: 'Truck'
      };
    case 'pending':
      return {
        text: 'Chờ xử lý',
        color: 'text-yellow-600',
        icon: 'Clock'
      };
    case 'cancelled':
      return {
        text: 'Đã hủy',
        color: 'text-red-600',
        icon: 'X'
      };
    default:
      return {
        text: 'Không xác định',
        color: 'text-gray-600',
        icon: 'HelpCircle'
      };
  }
}; 