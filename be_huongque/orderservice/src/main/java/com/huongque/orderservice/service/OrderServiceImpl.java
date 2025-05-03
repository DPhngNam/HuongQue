package com.huongque.orderservice.service;

import com.huongque.orderservice.dto.OrderItemRequest;
import com.huongque.orderservice.dto.OrderItemResponse;
import com.huongque.orderservice.dto.OrderRequest;
import com.huongque.orderservice.dto.OrderResponse;
import com.huongque.orderservice.dto.OrderStatusUpdateRequest;
import com.huongque.orderservice.dto.OrderShippingAddressUpdateRequest;
import com.huongque.orderservice.dto.OrderFilterRequest;
import com.huongque.orderservice.dto.OrderStatisticsResponse;
import com.huongque.orderservice.dto.PaginationResponse;
import com.huongque.orderservice.exception.OrderNotFoundException;
import com.huongque.orderservice.model.Order;
import com.huongque.orderservice.model.OrderItem;
import com.huongque.orderservice.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.Map;
import java.util.ArrayList;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    @Transactional
    public OrderResponse createOrder(OrderRequest orderRequest) {
        Order order = new Order();
        order.setUserId(orderRequest.getUserId());
        order.setStatus("PENDING");
        order.setShippingAddress(orderRequest.getShippingAddress());
        order.setPaymentMethod(orderRequest.getPaymentMethod());
        
        // Calculate total amount
        double totalAmount = orderRequest.getOrderItems().stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
        order.setTotalAmount(totalAmount);

        // Create order items
        List<OrderItem> orderItems = orderRequest.getOrderItems().stream()
                .map(this::mapToOrderItem)
                .collect(Collectors.toList());
        orderItems.forEach(item -> item.setOrder(order));
        order.setOrderItems(orderItems);

        Order savedOrder = orderRepository.save(order);
        return mapToOrderResponse(savedOrder);
    }

    @Override
    public OrderResponse getOrder(UUID orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with id: " + orderId));
        return mapToOrderResponse(order);
    }

    @Override
    public PaginationResponse<OrderResponse> getOrdersByUserId(UUID userId, Pageable pageable) {
        Page<Order> orderPage = orderRepository.findByUserId(userId, pageable);
        return mapToPaginationResponse(orderPage);
    }

    @Override
    @Transactional
    public OrderResponse updateOrder(UUID orderId, OrderRequest orderRequest) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with id: " + orderId));

        if (!"PENDING".equals(order.getStatus())) {
            throw new IllegalStateException("Only PENDING orders can be updated");
        }

        order.setShippingAddress(orderRequest.getShippingAddress());
        order.setPaymentMethod(orderRequest.getPaymentMethod());

        // Update order items
        List<OrderItem> orderItems = orderRequest.getOrderItems().stream()
                .map(this::mapToOrderItem)
                .collect(Collectors.toList());
        orderItems.forEach(item -> item.setOrder(order));
        order.setOrderItems(orderItems);

        // Recalculate total amount
        double totalAmount = orderRequest.getOrderItems().stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
        order.setTotalAmount(totalAmount);

        Order updatedOrder = orderRepository.save(order);
        return mapToOrderResponse(updatedOrder);
    }

    @Override
    @Transactional
    public void cancelOrder(UUID orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with id: " + orderId));

        if (!"PENDING".equals(order.getStatus())) {
            throw new IllegalStateException("Only PENDING orders can be cancelled");
        }

        order.setStatus("CANCELLED");
        orderRepository.save(order);
    }

    @Override
    @Transactional
    public OrderResponse updateOrderStatus(UUID orderId, OrderStatusUpdateRequest statusUpdateRequest) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with id: " + orderId));

        String newStatus = statusUpdateRequest.getStatus();
        String currentStatus = order.getStatus();

        // Validate status transition
        if ("CANCELLED".equals(currentStatus)) {
            throw new IllegalStateException("Cannot update status of a cancelled order");
        }

        if ("COMPLETED".equals(currentStatus)) {
            throw new IllegalStateException("Cannot update status of a completed order");
        }

        if ("PENDING".equals(currentStatus) && "COMPLETED".equals(newStatus)) {
            throw new IllegalStateException("Cannot complete a pending order directly");
        }

        order.setStatus(newStatus);
        Order updatedOrder = orderRepository.save(order);
        return mapToOrderResponse(updatedOrder);
    }

    @Override
    @Transactional
    public OrderResponse updateShippingAddress(UUID orderId, OrderShippingAddressUpdateRequest shippingAddressUpdateRequest) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with id: " + orderId));

        // Only allow updating shipping address for PENDING orders
        if (!"PENDING".equals(order.getStatus())) {
            throw new IllegalStateException("Shipping address can only be updated for PENDING orders");
        }

        order.setShippingAddress(shippingAddressUpdateRequest.getShippingAddress());
        Order updatedOrder = orderRepository.save(order);
        return mapToOrderResponse(updatedOrder);
    }

    @Override
    public PaginationResponse<OrderResponse> getFilteredOrders(OrderFilterRequest filterRequest, Pageable pageable) {
        Page<Order> orderPage = orderRepository.findOrdersByFilters(
                filterRequest.getStatus(),
                filterRequest.getStartDate(),
                filterRequest.getEndDate(),
                filterRequest.getUserId(),
                filterRequest.getMinTotalAmount(),
                filterRequest.getMaxTotalAmount(),
                pageable
        );
        return mapToPaginationResponse(orderPage);
    }

    @Override
    public OrderStatisticsResponse getOrderStatistics() {
        List<Order> orders = orderRepository.findAll();
        
        OrderStatisticsResponse statistics = new OrderStatisticsResponse();
        statistics.setTotalOrders((long) orders.size());
        
        double totalRevenue = orders.stream()
                .filter(order -> !"CANCELLED".equals(order.getStatus()))
                .mapToDouble(Order::getTotalAmount)
                .sum();
        statistics.setTotalRevenue(totalRevenue);
        
        Map<String, Long> ordersByStatus = orders.stream()
                .collect(Collectors.groupingBy(Order::getStatus, Collectors.counting()));
        statistics.setOrdersByStatus(ordersByStatus);
        
        statistics.setAverageOrderValue(orders.isEmpty() ? 0.0 : totalRevenue / orders.size());
        statistics.setPendingOrders(ordersByStatus.getOrDefault("PENDING", 0L));
        statistics.setCompletedOrders(ordersByStatus.getOrDefault("COMPLETED", 0L));
        statistics.setCancelledOrders(ordersByStatus.getOrDefault("CANCELLED", 0L));
        
        Map<String, Double> revenueByStatus = orders.stream()
                .collect(Collectors.groupingBy(
                        Order::getStatus,
                        Collectors.summingDouble(Order::getTotalAmount)
                ));
        statistics.setRevenueByStatus(revenueByStatus);
        
        return statistics;
    }

    @Override
    public PaginationResponse<OrderResponse> getRecentOrders(Pageable pageable) {
        Page<Order> orderPage = orderRepository.findAll(
            PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "createdAt")
            )
        );
        return mapToPaginationResponse(orderPage);
    }

    @Override
    public PaginationResponse<OrderResponse> getHighValueOrders(Pageable pageable) {
        // Default minimum amount for high-value orders
        double minAmount = 1000.0;
        Page<Order> orderPage = orderRepository.findByTotalAmountGreaterThanEqual(
            minAmount,
            PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                Sort.by(Sort.Direction.DESC, "totalAmount")
            )
        );
        return mapToPaginationResponse(orderPage);
    }

    private OrderItem mapToOrderItem(OrderItemRequest request) {
        OrderItem orderItem = new OrderItem();
        orderItem.setProductId(request.getProductId());
        orderItem.setQuantity(request.getQuantity());
        orderItem.setPrice(request.getPrice());
        return orderItem;
    }

    private OrderResponse mapToOrderResponse(Order order) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setUserId(order.getUserId());
        response.setStatus(order.getStatus());
        response.setTotalAmount(order.getTotalAmount());
        response.setShippingAddress(order.getShippingAddress());
        response.setPaymentMethod(order.getPaymentMethod());
        response.setCreatedAt(order.getCreatedAt());
        response.setUpdatedAt(order.getUpdatedAt());

        List<OrderItemResponse> orderItemResponses = order.getOrderItems() != null
                ? order.getOrderItems().stream()
                    .map(this::mapToOrderItemResponse)
                    .collect(Collectors.toList())
                : new ArrayList<>();
        response.setOrderItems(orderItemResponses);

        return response;
    }

    private OrderItemResponse mapToOrderItemResponse(OrderItem orderItem) {
        OrderItemResponse response = new OrderItemResponse();
        response.setId(orderItem.getId());
        response.setProductId(orderItem.getProductId());
        response.setQuantity(orderItem.getQuantity());
        response.setPrice(orderItem.getPrice());
        return response;
    }

    @SuppressWarnings("unchecked")
    private <T> PaginationResponse<T> mapToPaginationResponse(Page<?> page) {
        PaginationResponse<T> response = new PaginationResponse<>();
        if (page.getContent().get(0) instanceof Order) {
            List<OrderResponse> content = page.getContent().stream()
                    .map(order -> mapToOrderResponse((Order) order))
                    .collect(Collectors.toList());
            response.setContent((List<T>) content);
        } else {
            response.setContent((List<T>) page.getContent());
        }
        response.setPage(page.getNumber());
        response.setSize(page.getSize());
        response.setTotalElements(page.getTotalElements());
        response.setTotalPages(page.getTotalPages());
        response.setLast(page.isLast());
        return response;
    }
} 