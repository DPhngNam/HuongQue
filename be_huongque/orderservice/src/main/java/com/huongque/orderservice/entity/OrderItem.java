package com.huongque.orderservice.entity;

import jakarta.persistence.*;
import lombok.*;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "order_items")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderItem {

    @Id
    @GeneratedValue(generator = "UUID") 
    @Column(name = "id")
    @Schema(description = "Order item ID", example = "b3b8c7e2-8e2a-4c2a-9e2a-8e2a4c2a9e2a")
    private UUID id; 

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false) 
    @Schema(description = "Order reference")
    @JsonIgnore
    private Order order;

    @Column(name = "product_id", nullable = false)
    @Schema(description = "Product ID", example = "b3b8c7e2-8e2a-4c2a-9e2a-8e2a4c2a9e2a")
    private UUID productId;

    @Column(name = "quantity", nullable = false)
    @Schema(description = "Quantity of the product", example = "2")
    private int quantity;

    @Column(name = "price", nullable = false)
    @Schema(description = "Price of the product", example = "50.00")
    private double price;

    @Column(name = "product_name")
    @Schema(description = "Product name", example = "Product A")
    private String productName;

    @Column(name = "product_image")
    @Schema(description = "Product image URL", example = "http://example.com/image.jpg")
    private String productImage;
}
