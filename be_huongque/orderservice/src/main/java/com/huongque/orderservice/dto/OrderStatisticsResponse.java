package com.huongque.orderservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderStatisticsResponse {
    private Long totalOrders;
    private Double totalRevenue;
    private Map<String, Long> ordersByStatus;
    private Double averageOrderValue;
    private Long pendingOrders;
    private Long completedOrders;
    private Long cancelledOrders;
    private Map<String, Double> revenueByStatus;
} 