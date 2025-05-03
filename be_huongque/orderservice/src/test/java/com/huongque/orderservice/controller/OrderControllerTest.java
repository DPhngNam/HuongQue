package com.huongque.orderservice.controller;

import com.huongque.orderservice.dto.*;
import com.huongque.orderservice.service.OrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrderControllerTest {

    @Mock
    private OrderService orderService;

    @InjectMocks
    private OrderController orderController;

    private OrderRequest orderRequest;
    private OrderResponse orderResponse;
    private UUID orderId;
    private UUID userId;
    private Pageable pageable;

    @BeforeEach
    void setUp() {
        orderId = UUID.randomUUID();
        userId = UUID.randomUUID();
        pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "createdAt"));

        // Setup OrderRequest
        List<OrderItemRequest> orderItems = new ArrayList<>();
        orderItems.add(new OrderItemRequest(UUID.randomUUID(), 2, 10.0));
        orderItems.add(new OrderItemRequest(UUID.randomUUID(), 1, 20.0));

        orderRequest = new OrderRequest();
        orderRequest.setUserId(userId);
        orderRequest.setOrderItems(orderItems);
        orderRequest.setShippingAddress("123 Test St");
        orderRequest.setPaymentMethod("CREDIT_CARD");

        // Setup OrderResponse
        orderResponse = new OrderResponse();
        orderResponse.setId(orderId);
        orderResponse.setUserId(userId);
        orderResponse.setStatus("PENDING");
        orderResponse.setTotalAmount(40.0);
        orderResponse.setShippingAddress("123 Test St");
        orderResponse.setPaymentMethod("CREDIT_CARD");
        orderResponse.setCreatedAt(LocalDateTime.now());
        orderResponse.setUpdatedAt(LocalDateTime.now());
    }

    @Test
    void createOrder_ShouldReturnCreatedOrder() {
        when(orderService.createOrder(any(OrderRequest.class))).thenReturn(orderResponse);

        ResponseEntity<OrderResponse> response = orderController.createOrder(orderRequest);

        assertNotNull(response);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(orderResponse, response.getBody());
        verify(orderService, times(1)).createOrder(any(OrderRequest.class));
    }

    @Test
    void getOrder_ShouldReturnOrder() {
        when(orderService.getOrder(orderId)).thenReturn(orderResponse);

        ResponseEntity<OrderResponse> response = orderController.getOrder(orderId);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(orderResponse, response.getBody());
        verify(orderService, times(1)).getOrder(orderId);
    }

    @Test
    void getOrdersByUserId_ShouldReturnUserOrders() {
        PaginationResponse<OrderResponse> paginationResponse = new PaginationResponse<>();
        paginationResponse.setContent(Collections.singletonList(orderResponse));
        paginationResponse.setPage(0);
        paginationResponse.setSize(10);
        paginationResponse.setTotalElements(1);
        paginationResponse.setTotalPages(1);
        paginationResponse.setLast(true);

        when(orderService.getOrdersByUserId(userId, pageable)).thenReturn(paginationResponse);

        ResponseEntity<PaginationResponse<OrderResponse>> response = orderController.getOrdersByUserId(
                userId, 0, 10, new String[]{"createdAt,desc"});

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().getContent().size());
        assertEquals(orderResponse, response.getBody().getContent().get(0));
        verify(orderService, times(1)).getOrdersByUserId(userId, pageable);
    }

    @Test
    void updateOrder_ShouldReturnUpdatedOrder() {
        when(orderService.updateOrder(orderId, orderRequest)).thenReturn(orderResponse);

        ResponseEntity<OrderResponse> response = orderController.updateOrder(orderId, orderRequest);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(orderResponse, response.getBody());
        verify(orderService, times(1)).updateOrder(orderId, orderRequest);
    }

    @Test
    void updateOrderStatus_ShouldReturnUpdatedOrder() {
        OrderStatusUpdateRequest statusUpdate = new OrderStatusUpdateRequest();
        statusUpdate.setStatus("COMPLETED");
        when(orderService.updateOrderStatus(orderId, statusUpdate)).thenReturn(orderResponse);

        ResponseEntity<OrderResponse> response = orderController.updateOrderStatus(orderId, statusUpdate);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(orderResponse, response.getBody());
        verify(orderService, times(1)).updateOrderStatus(orderId, statusUpdate);
    }

    @Test
    void updateShippingAddress_ShouldReturnUpdatedOrder() {
        OrderShippingAddressUpdateRequest addressUpdate = new OrderShippingAddressUpdateRequest();
        addressUpdate.setShippingAddress("456 New St");
        when(orderService.updateShippingAddress(orderId, addressUpdate)).thenReturn(orderResponse);

        ResponseEntity<OrderResponse> response = orderController.updateShippingAddress(orderId, addressUpdate);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(orderResponse, response.getBody());
        verify(orderService, times(1)).updateShippingAddress(orderId, addressUpdate);
    }

    @Test
    void cancelOrder_ShouldReturnNoContent() {
        doNothing().when(orderService).cancelOrder(orderId);

        ResponseEntity<Void> response = orderController.cancelOrder(orderId);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(orderService, times(1)).cancelOrder(orderId);
    }
} 