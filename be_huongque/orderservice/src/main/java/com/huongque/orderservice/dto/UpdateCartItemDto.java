package com.huongque.orderservice.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class UpdateCartItemDto {
    private UUID id;
    private int quantity;
    private double price;
}
