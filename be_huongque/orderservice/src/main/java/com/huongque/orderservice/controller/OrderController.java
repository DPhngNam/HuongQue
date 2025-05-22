package com.huongque.orderservice.controller;

import com.huongque.orderservice.dto.createOrderDto;
import com.huongque.orderservice.dto.updateOrderDto;
import com.huongque.orderservice.dto.orderItemDto;
import com.huongque.orderservice.entity.Order;
import com.huongque.orderservice.entity.OrderItem;
import com.huongque.orderservice.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RequestMapping("/api/v1/orders")
@RestController
@Tag(name = "Order API", description = "API for managing orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @Operation(summary = "Create a new order", description = "Creates a new order and returns the created order.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Order created successfully")
    })
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody createOrderDto dto) {


        Order order = Order.builder()
            .userId(dto.getUserId())
            .customerName(dto.getCustomerName())
            .deliveryAddress(dto.getDeliveryAddress())
            .customerPhone(dto.getCustomerPhone())
            .orderItems(mapToOrderItems(dto.getOrderItems(), null))
            .orderDate(LocalDate.now())
            .orderStatus(dto.getOrderStatus())
            .orderTotal(dto.getOrderTotal())
            .orderPaymentMethod(dto.getOrderPaymentMethod())
            .orderPaymentStatus(dto.getOrderPaymentStatus())    
            .orderPaymentDate(dto.getOrderPaymentDate())
            .orderPaymentAmount(dto.getOrderPaymentAmount())
            .build();
        List<OrderItem> items = mapToOrderItems(dto.getOrderItems(), order);
        if (items != null) {
            items.forEach(item -> item.setOrder(order));
            order.setOrderItems(items);
        }
        Order savedOrder = orderService.createOrder(order);
        return ResponseEntity.ok(savedOrder);
    }

    @Operation(summary = "Get order by ID", description = "Retrieves an order by its ID.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Order found"),
        @ApiResponse(responseCode = "404", description = "Order not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrder(@Parameter(description = "Order ID") @PathVariable String id) {
        Order order = orderService.getOrderById(UUID.fromString(id));
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(order);
    }

    @Operation(summary = "Update order", description = "Updates an existing order by its ID.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Order updated successfully"),
        @ApiResponse(responseCode = "404", description = "Order not found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@Parameter(description = "Order ID") @PathVariable String id, @RequestBody updateOrderDto dto) {
        Order existingOrder = orderService.getOrderById(UUID.fromString(id));
        if (existingOrder == null) {
            return ResponseEntity.notFound().build();
        }
        updateOrderFromDto(existingOrder, dto);
        Order updatedOrder = orderService.updateOrder(existingOrder);
        return ResponseEntity.ok(updatedOrder);
    }

    @Operation(summary = "Delete order", description = "Deletes an order by its ID.")
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Order deleted successfully")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@Parameter(description = "Order ID") @PathVariable String id) {
        orderService.deleteOrder(UUID.fromString(id));
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Get all orders by user ID", description = "Retrieves all orders for a specific user.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Orders retrieved successfully")
    })
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUserId(@Parameter(description = "User ID") @PathVariable String userId) {
        List<Order> orders = orderService.getOrdersByUserId(UUID.fromString(userId));
        return ResponseEntity.ok(orders);
    }

    @Operation(summary = "Get orders by user, month, and year", description = "Retrieves all orders for a user in a specific month and year.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Orders retrieved successfully")
    })
    @GetMapping("/user/{userId}/month/{month}/year/{year}")
    public ResponseEntity<List<Order>> getOrdersByUserIdAndMonthAndYear(
            @Parameter(description = "User ID") @PathVariable String userId,
            @Parameter(description = "Month (1-12)") @PathVariable int month,
            @Parameter(description = "Year") @PathVariable int year) {
        List<Order> orders = orderService.getOrdersByUserIdAndMonthAndYear(UUID.fromString(userId), month, year);
        return ResponseEntity.ok(orders);
    }



    private List<OrderItem> mapToOrderItems(List<orderItemDto> dtos, Order order) {
        if (dtos == null) return null;
        return dtos.stream().map(dto -> {
            OrderItem item = OrderItem.builder()
                .order(order)
                .productId(dto.getProductId() != null ? UUID.fromString(dto.getProductId()) : null)
                .quantity(dto.getQuantity())
                .price(dto.getPrice())
                .productName(dto.getProductName())
                .productImage(dto.getProductImage())
                .build();
            return item;
        }).collect(Collectors.toList());
    }
    

    private void updateOrderFromDto(Order order, updateOrderDto dto) {
        if (dto.getCustomerName() != null) order.setCustomerName(dto.getCustomerName());
        if (dto.getDeliveryAddress() != null) order.setDeliveryAddress(dto.getDeliveryAddress());
        if (dto.getCustomerPhone() != null) order.setCustomerPhone(dto.getCustomerPhone());
        if (dto.getOrderItems() != null) order.setOrderItems(mapToOrderItems(dto.getOrderItems(), order));
        if (dto.getOrderDate() != null && !dto.getOrderDate().isEmpty()) order.setOrderDate(parseDate(dto.getOrderDate()));
        if (dto.getOrderStatus() != null) order.setOrderStatus(dto.getOrderStatus());
        if (dto.getOrderTotal() != null) order.setOrderTotal(dto.getOrderTotal());
        if (dto.getOrderPaymentMethod() != null) order.setOrderPaymentMethod(dto.getOrderPaymentMethod());
        if (dto.getOrderPaymentStatus() != null) order.setOrderPaymentStatus(dto.getOrderPaymentStatus());
        if (dto.getOrderPaymentDate() != null) order.setOrderPaymentDate(dto.getOrderPaymentDate());
        if (dto.getOrderPaymentAmount() != null) order.setOrderPaymentAmount(dto.getOrderPaymentAmount());
    }

    private LocalDate parseDate(String dateStr) {
        if (dateStr == null || dateStr.isEmpty()) return null;
        return LocalDate.parse(dateStr, DATE_FORMATTER);
    }
}