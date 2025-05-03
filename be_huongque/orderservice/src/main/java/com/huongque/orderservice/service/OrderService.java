package com.huongque.orderservice.service;

import com.huongque.orderservice.dto.*;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface OrderService {
    OrderResponse createOrder(OrderRequest orderRequest);
    OrderResponse getOrder(UUID orderId);
    PaginationResponse<OrderResponse> getOrdersByUserId(UUID userId, Pageable pageable);
    OrderResponse updateOrder(UUID orderId, OrderRequest orderRequest);
    OrderResponse updateOrderStatus(UUID orderId, OrderStatusUpdateRequest statusUpdateRequest);
    OrderResponse updateShippingAddress(UUID orderId, OrderShippingAddressUpdateRequest shippingAddressUpdateRequest);
    void cancelOrder(UUID orderId);
    
    // Admin analysis methods
    PaginationResponse<OrderResponse> getFilteredOrders(OrderFilterRequest filterRequest, Pageable pageable);
    PaginationResponse<OrderResponse> getRecentOrders(Pageable pageable);
    PaginationResponse<OrderResponse> getHighValueOrders(Pageable pageable);
    OrderStatisticsResponse getOrderStatistics();
} 