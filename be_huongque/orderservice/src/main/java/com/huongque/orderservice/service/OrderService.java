package com.huongque.orderservice.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.huongque.orderservice.repository.OrderRepository;
import com.huongque.orderservice.model.Order;
import com.huongque.orderservice.model.Status;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    
    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }
    
    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }
    
    public Optional<Order> getOrderById(UUID id) {
        return orderRepository.findById(id);
    }
    
    public List<Order> getOrdersByUserId(UUID userId) {
        return orderRepository.findByUserId(userId);
    }
    
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    
    public List<Order> getOrdersByStatus(Status status) {
        return orderRepository.findByStatus(status);
    }
    
    public List<Order> getOrdersByPaymentId(String paymentId) {
        return orderRepository.findByPaymentId(paymentId);
    }
    
    public Order updateOrderStatus(UUID orderId, Status newStatus) {
        Optional<Order> orderOpt = orderRepository.findById(orderId);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            Order updatedOrder;
            
            if (newStatus == Status.COMPLETED && order.getPaymentId() != null) {
                updatedOrder = order.markAsCompleted(order.getPaymentId());
            } else if (newStatus == Status.FAILED) {
                updatedOrder = order.markAsFailed();
            } else {
                throw new UnsupportedOperationException("Status change to " + newStatus + " is not supported yet");
            }
            
            return orderRepository.save(updatedOrder);
        }
        
        throw new IllegalArgumentException("Order not found with ID: " + orderId);
    }
    
    public void deleteOrder(UUID id) {
        orderRepository.deleteById(id);
    }
}
