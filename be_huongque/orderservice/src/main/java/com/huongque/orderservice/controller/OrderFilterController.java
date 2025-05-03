package com.huongque.orderservice.controller;

import com.huongque.orderservice.dto.*;
import com.huongque.orderservice.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders/filter")
public class OrderFilterController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<PaginationResponse<OrderResponse>> getFilteredOrders(
            @RequestBody OrderFilterRequest filterRequest,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt,desc") String[] sort) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(sort[1]), sort[0]));
        PaginationResponse<OrderResponse> response = orderService.getFilteredOrders(filterRequest, pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/recent")
    public ResponseEntity<PaginationResponse<OrderResponse>> getRecentOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt,desc") String[] sort) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(sort[1]), sort[0]));
        PaginationResponse<OrderResponse> response = orderService.getRecentOrders(pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/high-value")
    public ResponseEntity<PaginationResponse<OrderResponse>> getHighValueOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "totalAmount,desc") String[] sort) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(sort[1]), sort[0]));
        PaginationResponse<OrderResponse> response = orderService.getHighValueOrders(pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/statistics")
    public ResponseEntity<OrderStatisticsResponse> getOrderStatistics() {
        OrderStatisticsResponse response = orderService.getOrderStatistics();
        return ResponseEntity.ok(response);
    }
} 