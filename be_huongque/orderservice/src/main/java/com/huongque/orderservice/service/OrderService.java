package com.huongque.orderservice.service;

import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import com.huongque.orderservice.repository.OrderRepository;
import com.huongque.orderservice.entity.Order;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public Order getOrderById(UUID orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }

    public Order updateOrder(Order order) {
        return orderRepository.save(order);
    }

    public void deleteOrder(UUID orderId) {
        orderRepository.deleteById(orderId);
    }

    public List<Order> getOrdersByUserId(UUID userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getOrdersByUserIdAndMonthAndYear(UUID userId, int month, int year) {
        return orderRepository.findByUserIdAndMonthAndYear(userId, month, year);
    }
}