package com.huongque.orderservice.controller;

import com.huongque.orderservice.dto.OrderFilterRequest;
import com.huongque.orderservice.dto.OrderResponse;
import com.huongque.orderservice.dto.OrderStatisticsResponse;
import com.huongque.orderservice.dto.PaginationResponse;
import com.huongque.orderservice.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/statistics")
    public ResponseEntity<OrderStatisticsResponse> getOrderStatistics() {
        OrderStatisticsResponse statistics = orderService.getOrderStatistics();
        return ResponseEntity.ok(statistics);
    }

    @PostMapping("/filter")
    public ResponseEntity<PaginationResponse<OrderResponse>> getFilteredOrders(
            @RequestBody OrderFilterRequest filterRequest,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt,desc") String[] sort) {
        Sort.Direction direction = Sort.Direction.DESC;
        String property = "createdAt";
        if (sort != null && sort.length > 0) {
            String[] sortParams = sort[0].split(",");
            if (sortParams.length > 1) {
                direction = Sort.Direction.fromString(sortParams[1]);
            }
            property = sortParams[0];
        }
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, property));
        PaginationResponse<OrderResponse> response = orderService.getFilteredOrders(filterRequest, pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/recent")
    public ResponseEntity<PaginationResponse<OrderResponse>> getRecentOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt,desc") String[] sort) {
        Sort.Direction direction = Sort.Direction.DESC;
        String property = "createdAt";
        if (sort != null && sort.length > 0) {
            String[] sortParams = sort[0].split(",");
            if (sortParams.length > 1) {
                direction = Sort.Direction.fromString(sortParams[1]);
            }
            property = sortParams[0];
        }
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, property));
        PaginationResponse<OrderResponse> response = orderService.getRecentOrders(pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/high-value")
    public ResponseEntity<PaginationResponse<OrderResponse>> getHighValueOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "totalAmount,desc") String[] sort) {
        Sort.Direction direction = Sort.Direction.DESC;
        String property = "totalAmount";
        if (sort != null && sort.length > 0) {
            String[] sortParams = sort[0].split(",");
            if (sortParams.length > 1) {
                direction = Sort.Direction.fromString(sortParams[1]);
            }
            property = sortParams[0];
        }
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, property));
        PaginationResponse<OrderResponse> response = orderService.getHighValueOrders(pageable);
        return ResponseEntity.ok(response);
    }
} 