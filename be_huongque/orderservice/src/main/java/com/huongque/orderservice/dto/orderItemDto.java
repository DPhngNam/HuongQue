package com.huongque.orderservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import io.swagger.v3.oas.annotations.media.Schema;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class orderItemDto {
    @Schema(description = "Product ID", example = "b3b8c7e2-8e2a-4c2a-9e2a-8e2a4c2a9e2a")
    private String productId;
    @Schema(description = "Quantity of the product", example = "2")
    private int quantity;
    @Schema(description = "Price of the product", example = "50.00")
    private double price;

    @Schema(description = "Product name", example = "Product A")
    private String productName;
    @Schema(description = "Product image URL", example = "http://example.com/image.jpg")
    private String productImage;
}
