package com.huongque.orderservice.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;

import com.huongque.orderservice.dto.OrderFilterRequest;
import com.huongque.orderservice.dto.OrderResponse;
import com.huongque.orderservice.dto.OrderStatisticsResponse;
import com.huongque.orderservice.dto.PaginationResponse;
import com.huongque.orderservice.service.OrderService;

@ExtendWith(MockitoExtension.class)
class AdminOrderControllerTest {

    @Mock
    private OrderService orderService;

    @InjectMocks
    private AdminOrderController adminOrderController;

    private OrderResponse orderResponse;
    private UUID userId;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();

        // Setup OrderResponse
        orderResponse = new OrderResponse();
        orderResponse.setId(UUID.randomUUID());
        orderResponse.setUserId(userId);
        orderResponse.setStatus("PENDING");
        orderResponse.setTotalAmount(40.0);
        orderResponse.setShippingAddress("123 Test St");
        orderResponse.setPaymentMethod("CREDIT_CARD");
        orderResponse.setCreatedAt(LocalDateTime.now());
        orderResponse.setUpdatedAt(LocalDateTime.now());
    }

    @Test
    void getOrderStatistics_ShouldReturnStatistics() {
        OrderStatisticsResponse statistics = new OrderStatisticsResponse();
        statistics.setTotalOrders(3L);
        statistics.setTotalRevenue(150.0);
        statistics.setAverageOrderValue(50.0);
        statistics.setPendingOrders(1L);
        statistics.setCompletedOrders(1L);
        statistics.setCancelledOrders(1L);

        when(orderService.getOrderStatistics()).thenReturn(statistics);

        ResponseEntity<OrderStatisticsResponse> response = adminOrderController.getOrderStatistics();

        assertNotNull(response);
        assertEquals(statistics, response.getBody());
        verify(orderService, times(1)).getOrderStatistics();
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

        Pageable pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "createdAt"));
        PaginationResponse<OrderResponse> paginationResponse = new PaginationResponse<>();
        paginationResponse.setContent(Collections.singletonList(orderResponse));
        paginationResponse.setPage(0);
        paginationResponse.setSize(10);
        paginationResponse.setTotalElements(1);
        paginationResponse.setTotalPages(1);
        paginationResponse.setLast(true);

        when(orderService.getFilteredOrders(filterRequest, pageable)).thenReturn(paginationResponse);

        ResponseEntity<PaginationResponse<OrderResponse>> response = adminOrderController.getFilteredOrders(
                filterRequest, 0, 10, new String[]{"createdAt,desc"});

        assertNotNull(response);
        assertEquals(1, response.getBody().getContent().size());
        assertEquals(orderResponse, response.getBody().getContent().get(0));
        verify(orderService, times(1)).getFilteredOrders(filterRequest, pageable);
    }

    @Test
    void getRecentOrders_ShouldReturnLimitedOrders() {
        Pageable pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "createdAt"));
        PaginationResponse<OrderResponse> paginationResponse = new PaginationResponse<>();
        paginationResponse.setContent(Collections.singletonList(orderResponse));
        paginationResponse.setPage(0);
        paginationResponse.setSize(10);
        paginationResponse.setTotalElements(1);
        paginationResponse.setTotalPages(1);
        paginationResponse.setLast(true);

        when(orderService.getRecentOrders(pageable)).thenReturn(paginationResponse);

        ResponseEntity<PaginationResponse<OrderResponse>> response = adminOrderController.getRecentOrders(
                0, 10, new String[]{"createdAt,desc"});

        assertNotNull(response);
        assertEquals(1, response.getBody().getContent().size());
        assertEquals(orderResponse, response.getBody().getContent().get(0));
        verify(orderService, times(1)).getRecentOrders(pageable);
    }

    @Test
    void getHighValueOrders_ShouldReturnHighValueOrders() {
        Pageable pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "totalAmount"));
        PaginationResponse<OrderResponse> paginationResponse = new PaginationResponse<>();
        paginationResponse.setContent(Collections.singletonList(orderResponse));
        paginationResponse.setPage(0);
        paginationResponse.setSize(10);
        paginationResponse.setTotalElements(1);
        paginationResponse.setTotalPages(1);
        paginationResponse.setLast(true);

        when(orderService.getHighValueOrders(pageable)).thenReturn(paginationResponse);

        ResponseEntity<PaginationResponse<OrderResponse>> response = adminOrderController.getHighValueOrders(
                0, 10, new String[]{"totalAmount,desc"});

        assertNotNull(response);
        assertEquals(1, response.getBody().getContent().size());
        assertEquals(orderResponse, response.getBody().getContent().get(0));
        verify(orderService, times(1)).getHighValueOrders(pageable);
    }
} 