package com.huongque.orderservice.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class CartItemDto {
    private UUID id;
    private UUID productId;
    private int quantity;
    private double price;
    private String productName;
    private String productImage;
}
