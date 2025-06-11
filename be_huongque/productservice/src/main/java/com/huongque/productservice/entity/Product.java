package com.huongque.productservice.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="products")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(name="name", nullable = false)
    private String name;
    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name="price",nullable = false)
    private Double price;

    @ElementCollection
    @Column(columnDefinition = "TEXT")
    private List<String> images;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name="tenant_id",nullable = true)
    private UUID tenantId;
    @CreationTimestamp
    @Column(name="created_at",nullable = false, updatable = false)
    private Timestamp createdAt;
    @UpdateTimestamp
    @Column(name="updated_at",nullable = false)
    private Timestamp updatedAt;
}
