package com.huongque.orderservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.huongque.orderservice.model.Order;
import com.huongque.orderservice.service.OrderService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/orders")
public class OrderController {
    
    
    @Autowired
    private OrderService orderService;

    @Operation(summary = "Get all orders")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "All orders retrieved successfully"),
        @ApiResponse(responseCode = "404", description = "No orders found")
    })
    @GetMapping("")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }
    
    // @PostMapping("")
    // public Order createOrder(@RequestBody Order order) {}
    
    // @GetMapping("/{id}")
    // public Order getOrderById(@PathVariable UUID id) {}

    // @GetMapping("/user/{userId}")
    // public List<Order> getOrdersByUserId(@PathVariable UUID userId) {}

    // @GetMapping("/status/{status}")
    // public List<Order> getOrdersByStatus(@PathVariable Status status) {}

    // @GetMapping("/payment/{paymentId}")
    // public List<Order> getOrdersByPaymentId(@PathVariable String paymentId) {}

    // @PutMapping("/{id}")
    // public Order updateOrderStatus(@PathVariable UUID id, @RequestBody Status status) {}

    // @DeleteMapping("/{id}")
    // public void deleteOrder(@PathVariable UUID id) {}
}
