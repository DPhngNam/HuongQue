package com.huongque.orderservice.dto;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import io.swagger.v3.oas.annotations.media.Schema;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class updateOrderDto {
    @Schema(description = "Order ID", example = "b3b8c7e2-8e2a-4c2a-9e2a-8e2a4c2a9e2a")
    private String orderId;
    @Schema(description = "Customer name", example = "John Doe")
    private String customerName;
    @Schema(description = "Delivery address", example = "123 Main St")
    private String deliveryAddress;
    @Schema(description = "Customer phone number", example = "1234567890")
    private String customerPhone;
    @Schema(description = "List of order items")
    private List<orderItemDto> orderItems;
    @Schema(description = "Order status", example = "PENDING")
    private String orderStatus;
    @Schema(description = "Order total amount", example = "100.00")
    private String orderTotal;
    @Schema(description = "Payment method", example = "CASH")
    private String orderPaymentMethod;
    @Schema(description = "Payment status", example = "PAID")
    private String orderPaymentStatus;
    @Schema(description = "Payment date", example = "2024-05-22")
    private String orderPaymentDate;
    @Schema(description = "Payment amount", example = "100.00")
    private String orderPaymentAmount;
    /**
     * Order date in format yyyy-MM-dd
     */
    @Schema(description = "Order date in format yyyy-MM-dd", example = "2024-05-22")
    private String orderDate;
}
