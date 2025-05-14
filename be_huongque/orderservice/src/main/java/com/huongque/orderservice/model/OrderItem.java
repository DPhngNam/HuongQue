package com.huongque.orderservice.model;

import java.util.Objects;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "order_items")
public class OrderItem {
    @Id
    private UUID id;
    
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
    
    @Column(name = "product_id")
    private UUID productId;
    
    @Column(name = "quantity")
    private Long quantity;
    
    @Column(name = "price")
    private Money price;
    
    private OrderItem(Builder builder) {
        this.id = builder.id;
        this.productId = builder.productId;
        this.quantity = builder.quantity;
        this.price = builder.price;
    }
    
    public static class Builder {
        private UUID id = UUID.randomUUID();
        private UUID productId;
        private Long quantity = 1L;
        private Money price = Money.ZERO;
        
        public Builder withProductId(UUID productId) {
            this.productId = productId;
            return this;
        }
        
        public Builder withQuantity(Long quantity) {
            this.quantity = quantity;
            return this;
        }
        
        public Builder withPrice(Money price) {
            this.price = price;
            return this;
        }
        
        public OrderItem build() {
            validate();
            return new OrderItem(this);
        }
        
        private void validate() {
            if (productId == null) {
                throw new IllegalStateException("Product ID cannot be null");
            }
            if (quantity == null || quantity <= 0) {
                throw new IllegalStateException("Quantity must be positive");
            }
            if (price == null || price.isLessThan(Money.ZERO)) {
                throw new IllegalStateException("Price cannot be negative");
            }
        }
    }
    
    // Factory method
    public static OrderItem createItem(UUID productId, Long quantity, Money price) {
        return new Builder()
            .withProductId(productId)
            .withQuantity(quantity)
            .withPrice(price)
            .build();
    }
    
    // Domain methods
    public Money getTotalPrice() {
        return price.multiply(quantity);
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderItem orderItem = (OrderItem) o;
        return Objects.equals(id, orderItem.id);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
