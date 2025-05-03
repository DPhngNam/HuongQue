package com.huongque.orderservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    private UUID userId;
    private String shippingAddress;
    private String paymentMethod;
    private List<OrderItemRequest> orderItems;
} 