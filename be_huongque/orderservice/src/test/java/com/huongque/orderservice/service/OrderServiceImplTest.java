package com.huongque.orderservice.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyDouble;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.huongque.orderservice.dto.OrderFilterRequest;
import com.huongque.orderservice.dto.OrderRequest;
import com.huongque.orderservice.dto.OrderResponse;
import com.huongque.orderservice.dto.OrderShippingAddressUpdateRequest;
import com.huongque.orderservice.dto.OrderStatisticsResponse;
import com.huongque.orderservice.dto.OrderStatusUpdateRequest;
import com.huongque.orderservice.dto.PaginationResponse;
import com.huongque.orderservice.exception.OrderNotFoundException;
import com.huongque.orderservice.model.Order;
import com.huongque.orderservice.repository.OrderRepository;

@ExtendWith(MockitoExtension.class)
class OrderServiceImplTest {

    @Mock
    private OrderRepository orderRepository;

    @InjectMocks
    private OrderServiceImpl orderService;

    private OrderRequest orderRequest;
    private Order order;
    private UUID orderId;
    private UUID userId;
    private Pageable pageable;

    @BeforeEach
    void setUp() {
        orderId = UUID.randomUUID();
        userId = UUID.randomUUID();
        pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "createdAt"));

        orderRequest = new OrderRequest();
        orderRequest.setUserId(userId);
        orderRequest.setShippingAddress("123 Test St");
        orderRequest.setPaymentMethod("CREDIT_CARD");
        orderRequest.setOrderItems(new ArrayList<>());

        order = new Order();
        order.setId(orderId);
        order.setUserId(userId);
        order.setStatus("PENDING");
        order.setTotalAmount(100.0);
        order.setShippingAddress("123 Test St");
        order.setPaymentMethod("CREDIT_CARD");
        order.setOrderItems(new ArrayList<>());
    }

    @Test
    void createOrder_ShouldCreateNewOrder() {
        when(orderRepository.save(any(Order.class))).thenReturn(order);

        OrderResponse response = orderService.createOrder(orderRequest);

        assertNotNull(response);
        assertEquals(orderId, response.getId());
        assertEquals(userId, response.getUserId());
        assertEquals("PENDING", response.getStatus());
        assertEquals(100.0, response.getTotalAmount());
        assertEquals(0, response.getOrderItems().size());
        verify(orderRepository, times(1)).save(any(Order.class));
    }

    @Test
    void getOrder_ShouldReturnOrder() {
        when(orderRepository.findById(orderId)).thenReturn(Optional.of(order));

        OrderResponse response = orderService.getOrder(orderId);

        assertNotNull(response);
        assertEquals(orderId, response.getId());
        assertEquals(userId, response.getUserId());
        verify(orderRepository, times(1)).findById(orderId);
    }

    @Test
    void getOrder_ShouldThrowExceptionWhenNotFound() {
        when(orderRepository.findById(orderId)).thenReturn(Optional.empty());

        assertThrows(OrderNotFoundException.class, () -> orderService.getOrder(orderId));
    }

    @Test
    void getOrdersByUserId_ShouldReturnUserOrders() {
        Page<Order> orderPage = new PageImpl<>(Collections.singletonList(order));
        when(orderRepository.findByUserId(userId, pageable)).thenReturn(orderPage);

        PaginationResponse<OrderResponse> response = orderService.getOrdersByUserId(userId, pageable);

        assertNotNull(response);
        assertEquals(1, response.getContent().size());
        assertEquals(orderId, response.getContent().get(0).getId());
        assertEquals(userId, response.getContent().get(0).getUserId());
        assertEquals(order.getStatus(), response.getContent().get(0).getStatus());
        assertEquals(order.getTotalAmount(), response.getContent().get(0).getTotalAmount());
        verify(orderRepository, times(1)).findByUserId(userId, pageable);
    }

    @Test
    void updateOrder_ShouldUpdateExistingOrder() {
        when(orderRepository.findById(orderId)).thenReturn(Optional.of(order));
        when(orderRepository.save(any(Order.class))).thenReturn(order);

        OrderResponse response = orderService.updateOrder(orderId, orderRequest);

        assertNotNull(response);
        assertEquals(orderId, response.getId());
        verify(orderRepository, times(1)).findById(orderId);
        verify(orderRepository, times(1)).save(any(Order.class));
    }

    @Test
    void cancelOrder_ShouldUpdateOrderStatus() {
        when(orderRepository.findById(orderId)).thenReturn(Optional.of(order));
        when(orderRepository.save(any(Order.class))).thenReturn(order);

        orderService.cancelOrder(orderId);

        assertEquals("CANCELLED", order.getStatus());
        verify(orderRepository, times(1)).save(any(Order.class));
    }

    @Test
    void updateOrderStatus_ShouldUpdateStatus() {
        Order order = createOrderWithStatus("PROCESSING", 100.0);
        order.setOrderItems(new ArrayList<>());
        when(orderRepository.findById(orderId)).thenReturn(Optional.of(order));
        when(orderRepository.save(any(Order.class))).thenReturn(order);

        OrderStatusUpdateRequest statusUpdateRequest = new OrderStatusUpdateRequest();
        statusUpdateRequest.setStatus("SHIPPED");

        OrderResponse response = orderService.updateOrderStatus(orderId, statusUpdateRequest);

        assertNotNull(response);
        assertEquals("SHIPPED", response.getStatus());
        verify(orderRepository, times(1)).save(any(Order.class));
    }

    @Test
    void updateShippingAddress_ShouldUpdateAddress() {
        OrderShippingAddressUpdateRequest addressUpdate = new OrderShippingAddressUpdateRequest();
        addressUpdate.setShippingAddress("456 New St");

        when(orderRepository.findById(orderId)).thenReturn(Optional.of(order));
        when(orderRepository.save(any(Order.class))).thenReturn(order);

        OrderResponse response = orderService.updateShippingAddress(orderId, addressUpdate);

        assertNotNull(response);
        assertEquals("456 New St", response.getShippingAddress());
        verify(orderRepository, times(1)).save(any(Order.class));
    }

    @Test
    void getFilteredOrders_ShouldReturnFilteredOrders() {
        OrderFilterRequest filterRequest = new OrderFilterRequest();
        filterRequest.setStatus("PENDING");
        filterRequest.setStartDate(LocalDateTime.now().minusDays(1));
        filterRequest.setEndDate(LocalDateTime.now());
        filterRequest.setUserId(userId);
        filterRequest.setMinTotalAmount(30.0);
        filterRequest.setMaxTotalAmount(50.0);

        Page<Order> orderPage = new PageImpl<>(Collections.singletonList(order));
        when(orderRepository.findOrdersByFilters(
                anyString(), any(), any(), any(), anyDouble(), anyDouble(), any(Pageable.class)
        )).thenReturn(orderPage);

        PaginationResponse<OrderResponse> response = orderService.getFilteredOrders(filterRequest, pageable);

        assertNotNull(response);
        assertEquals(1, response.getContent().size());
        verify(orderRepository, times(1)).findOrdersByFilters(
                anyString(), any(), any(), any(), anyDouble(), anyDouble(), any(Pageable.class)
        );
    }

    @Test
    void getOrderStatistics_ShouldReturnStatistics() {
        List<Order> orders = Arrays.asList(
                createOrderWithStatus("PENDING", 50.0),
                createOrderWithStatus("COMPLETED", 100.0),
                createOrderWithStatus("CANCELLED", 30.0)
        );

        when(orderRepository.findAll()).thenReturn(orders);

        OrderStatisticsResponse statistics = orderService.getOrderStatistics();

        assertNotNull(statistics);
        assertEquals(3L, statistics.getTotalOrders());
        assertEquals(150.0, statistics.getTotalRevenue());
        assertEquals(50.0, statistics.getAverageOrderValue());
        assertEquals(1L, statistics.getPendingOrders());
        assertEquals(1L, statistics.getCompletedOrders());
        assertEquals(1L, statistics.getCancelledOrders());
        verify(orderRepository, times(1)).findAll();
    }

    @Test
    void getRecentOrders_ShouldReturnLimitedOrders() {
        List<Order> orders = Arrays.asList(
                createOrderWithDate(LocalDateTime.now().minusDays(1)),
                createOrderWithDate(LocalDateTime.now()),
                createOrderWithDate(LocalDateTime.now().minusDays(2))
        );

        Page<Order> orderPage = new PageImpl<>(orders);
        when(orderRepository.findAll(any(Pageable.class))).thenReturn(orderPage);

        PaginationResponse<OrderResponse> response = orderService.getRecentOrders(pageable);

        assertNotNull(response);
        assertEquals(3, response.getContent().size());
        verify(orderRepository, times(1)).findAll(any(Pageable.class));
    }

    @Test
    void getHighValueOrders_ShouldReturnOrdersAboveThreshold() {
        List<Order> orders = Arrays.asList(
                createOrderWithAmount(100.0),
                createOrderWithAmount(50.0),
                createOrderWithAmount(200.0)
        );

        Page<Order> orderPage = new PageImpl<>(orders);
        when(orderRepository.findByTotalAmountGreaterThanEqual(anyDouble(), any(Pageable.class)))
                .thenReturn(orderPage);

        PaginationResponse<OrderResponse> response = orderService.getHighValueOrders(pageable);

        assertNotNull(response);
        assertEquals(3, response.getContent().size());
        verify(orderRepository, times(1)).findByTotalAmountGreaterThanEqual(anyDouble(), any(Pageable.class));
    }

    private Order createOrderWithStatus(String status, double amount) {
        Order order = new Order();
        order.setStatus(status);
        order.setTotalAmount(amount);
        return order;
    }

    private Order createOrderWithDate(LocalDateTime date) {
        Order order = new Order();
        order.setCreatedAt(date);
        return order;
    }

    private Order createOrderWithAmount(double amount) {
        Order order = new Order();
        order.setTotalAmount(amount);
        return order;
    }
} 