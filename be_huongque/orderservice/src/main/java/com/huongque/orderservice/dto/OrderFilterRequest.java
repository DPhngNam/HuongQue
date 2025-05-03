package com.huongque.orderservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderFilterRequest {
    private String status;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private UUID userId;
    private Double minTotalAmount;
    private Double maxTotalAmount;
} 