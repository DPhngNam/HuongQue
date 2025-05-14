package com.huongque.orderservice.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.CascadeType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) 
@Entity
@Table(name = "orders")
public class Order {
    @Id
    private UUID id;
    
    @Column(name = "user_id")
    private UUID userId;
    
    @Column(name = "total_quantity")
    private Long totalQuantity;
    
    @Column(name = "total_price")
    private Money totalPrice;
    
    @Enumerated(EnumType.STRING)
    private Status status;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems = new ArrayList<>();
    
    @Column(name = "payment_id")
    private String paymentId;
    
    @Column(name = "address")
    private Address address;
    
    @Column(name = "phone")
    private String phone;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    private Order(Builder builder) {
        this.id = builder.id;
        this.userId = builder.userId;
        this.totalQuantity = builder.totalQuantity;
        this.totalPrice = builder.totalPrice;
        this.status = builder.status;
        this.orderItems = new ArrayList<>(builder.orderItems);
        this.paymentId = builder.paymentId;
        this.address = builder.address;
        this.phone = builder.phone;
        this.createdAt = builder.createdAt;
        this.updatedAt = builder.updatedAt;
    }
    
    public static class Builder {
        private UUID id = UUID.randomUUID();
        private UUID userId;
        private Long totalQuantity = 0L;
        private Money totalPrice = Money.ZERO;
        private Status status = Status.PENDING;
        private List<OrderItem> orderItems = new ArrayList<>();
        private String paymentId;
        private Address address;
        private String phone;
        private LocalDateTime createdAt = LocalDateTime.now();
        private LocalDateTime updatedAt = LocalDateTime.now();
        
        public Builder withUserId(UUID userId) {
            this.userId = userId;
            return this;
        }
        
        public Builder withOrderItems(List<OrderItem> orderItems) {
            this.orderItems = new ArrayList<>(orderItems);
            calculateTotals();
            return this;
        }
        
        public Builder addOrderItem(OrderItem item) {
            this.orderItems.add(item);
            calculateTotals();
            return this;
        }
        
        public Builder withPaymentId(String paymentId) {
            this.paymentId = paymentId;
            return this;
        }
        
        public Builder withAddress(Address address) {
            this.address = address;
            return this;
        }
        
        public Builder withPhone(String phone) {
            this.phone = phone;
            return this;
        }
        
        public Builder withStatus(Status status) {
            this.status = status;
            return this;
        }
        
        private void calculateTotals() {
            this.totalQuantity = orderItems.stream()
                .mapToLong(OrderItem::getQuantity)
                .sum();
                
            this.totalPrice = orderItems.stream()
                .map(OrderItem::getTotalPrice)
                .reduce(Money.ZERO, Money::add);
        }
        
        public Order build() {
            validate();
            return new Order(this);
        }
        
        private void validate() {
            if (userId == null) {
                throw new IllegalStateException("User ID cannot be null");
            }
            if (orderItems.isEmpty()) {
                throw new IllegalStateException("Order must have at least one item");
            }
            if (address == null) {
                throw new IllegalStateException("Address cannot be null");
            }
            if (phone == null || phone.trim().isEmpty()) {
                throw new IllegalStateException("Phone number cannot be empty");
            }
        }
    }
    
    // Factory methods
    public static Order createPendingOrder(UUID userId, List<OrderItem> items, Address address, String phone) {
        return new Builder()
            .withUserId(userId)
            .withOrderItems(items)
            .withAddress(address)
            .withPhone(phone)
            .withStatus(Status.PENDING)
            .build();
    }
    
    // Domain methods
    public Order markAsCompleted(String paymentId) {
        Order completedOrder = new Builder()
            .withUserId(this.userId)
            .withOrderItems(this.orderItems)
            .withAddress(this.address)
            .withPhone(this.phone)
            .withPaymentId(paymentId)
            .withStatus(Status.COMPLETED)
            .build();
        completedOrder.updatedAt = LocalDateTime.now();
        return completedOrder;
    }
    
    public Order markAsFailed() {
        Order failedOrder = new Builder()
            .withUserId(this.userId)
            .withOrderItems(this.orderItems)
            .withAddress(this.address)
            .withPhone(this.phone)
            .withPaymentId(this.paymentId)
            .withStatus(Status.FAILED)
            .build();
        failedOrder.updatedAt = LocalDateTime.now();
        return failedOrder;
    }
    
    // Immutable collections
    public List<OrderItem> getOrderItems() {
        return Collections.unmodifiableList(orderItems);
    }
}
