package com.huongque.orderservice.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1/orders")
@RestController
public class OrderController {
    
    @PostMapping
    public String createOrder(@RequestBody String order) {
        // Logic to create an order
        return "Order created: " + order;
    }

    @GetMapping("/{id}")
    public String getOrder(@PathVariable String id) {
        // Logic to get an order by ID
        return "Order details for ID: " + id;
    }

    @PutMapping("/{id}")
    public String updateOrder(@PathVariable String id, @RequestBody String order) {
        // Logic to update an order by ID
        return "Order updated: " + order;
    }

    @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable String id) {
        // Logic to delete an order by ID
        return "Order deleted with ID: " + id;
    }

}