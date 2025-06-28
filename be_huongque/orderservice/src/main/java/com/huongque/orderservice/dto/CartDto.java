package com.huongque.orderservice.dto;

import lombok.Data;
import java.util.List;
import java.util.UUID;

@Data
public class CartDto {
    private UUID id;
    private UUID userId;
    private List<CartItemDto> cartItems;
}
