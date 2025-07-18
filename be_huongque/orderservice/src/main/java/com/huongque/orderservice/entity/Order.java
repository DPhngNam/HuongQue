package com.huongque.orderservice.entity;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "orders")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Order {
    @Schema(description = "Order ID", example = "b3b8c7e2-8e2a-4c2a-9e2a-8e2a4c2a9e2a")
    @Id
    @GeneratedValue(generator = "UUID")
    @Column(name = "orderId")
    private UUID orderId;
    
    @Schema(description = "User ID", example = "b3b8c7e2-8e2a-4c2a-9e2a-8e2a4c2a9e2a")
    @Column(name = "user_id")
    private UUID userId;
    @Schema(description = "Customer name", example = "John Doe")
    @Column(name = "customer_name")
    private String customerName;
    @Schema(description = "Delivery address", example = "123 Main St")
    @Column(name = "delivery_address")
    private String deliveryAddress;
    @Schema(description = "Customer phone number", example = "1234567890")
    @Column(name = "customer_phone")
    private String customerPhone;
    @Schema(description = "List of order items")
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems;
    @Schema(description = "Order status", example = "PENDING")
    @Column(name = "order_status")
    private String orderStatus;
    @Schema(description = "Order total amount", example = "100.00")
    @Column(name = "order_total")
    private String orderTotal;
    @Schema(description = "Payment method", example = "CASH")
    @Column(name = "order_payment_method")
    private String orderPaymentMethod;
    @Schema(description = "Payment status", example = "PAID")
    @Column(name = "order_payment_status")
    private String orderPaymentStatus;
    @Schema(description = "Payment date", example = "2024-05-22")
    @Column(name = "order_payment_date")
    private String orderPaymentDate;
    @Schema(description = "Payment amount", example = "100.00")
    @Column(name = "order_payment_amount")
    private String orderPaymentAmount;
    @Schema(description = "Order date", example = "2024-05-22")
    @Column(name = "order_date")
    private LocalDate orderDate;

    public Order(UUID userId, String customerName, String deliveryAddress, String customerPhone,
                 List<OrderItem> orderItems, String orderStatus, String orderTotal,
                 String orderPaymentMethod, String orderPaymentStatus, String orderPaymentDate,
                 String orderPaymentAmount) {
        this.userId = userId;
        this.customerName = customerName;
        this.deliveryAddress = deliveryAddress;
        this.customerPhone = customerPhone;
        this.orderItems = orderItems;
        this.orderStatus = orderStatus;
        this.orderTotal = orderTotal;
        this.orderPaymentMethod = orderPaymentMethod;
        this.orderPaymentStatus = orderPaymentStatus;
        this.orderPaymentDate = orderPaymentDate;
        this.orderPaymentAmount = orderPaymentAmount;
        this.orderDate = LocalDate.now();
    }


}

