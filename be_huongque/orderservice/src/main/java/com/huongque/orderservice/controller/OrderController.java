package com.huongque.orderservice.controller;

import com.huongque.orderservice.dto.OrderRequest;
import com.huongque.orderservice.dto.OrderResponse;
import com.huongque.orderservice.dto.OrderStatusUpdateRequest;
import com.huongque.orderservice.dto.OrderShippingAddressUpdateRequest;
import com.huongque.orderservice.dto.PaginationResponse;
import com.huongque.orderservice.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderRequest orderRequest) {
        OrderResponse response = orderService.createOrder(orderRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrder(@PathVariable UUID orderId) {
        OrderResponse response = orderService.getOrder(orderId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<PaginationResponse<OrderResponse>> getOrdersByUserId(
            @PathVariable UUID userId,
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
        PaginationResponse<OrderResponse> response = orderService.getOrdersByUserId(userId, pageable);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<OrderResponse> updateOrder(
            @PathVariable UUID orderId,
            @RequestBody OrderRequest orderRequest) {
        OrderResponse response = orderService.updateOrder(orderId, orderRequest);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{orderId}/status")
    public ResponseEntity<OrderResponse> updateOrderStatus(
            @PathVariable UUID orderId,
            @RequestBody OrderStatusUpdateRequest statusUpdateRequest) {
        OrderResponse response = orderService.updateOrderStatus(orderId, statusUpdateRequest);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{orderId}/shipping-address")
    public ResponseEntity<OrderResponse> updateShippingAddress(
            @PathVariable UUID orderId,
            @RequestBody OrderShippingAddressUpdateRequest shippingAddressUpdateRequest) {
        OrderResponse response = orderService.updateShippingAddress(orderId, shippingAddressUpdateRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{orderId}/cancel")
    public ResponseEntity<Void> cancelOrder(@PathVariable UUID orderId) {
        orderService.cancelOrder(orderId);
        return ResponseEntity.ok().build();
    }
} 