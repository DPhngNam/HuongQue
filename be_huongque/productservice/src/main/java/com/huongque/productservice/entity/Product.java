package com.huongque.productservice.entity;

import jakarta.persistence.*;
import lombok.Data;


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

    private String name;
    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name="price",nullable = false)
    private Double price;
    @Column(name="quantity",nullable = false)
    private Integer quantity;

    @ElementCollection
    @Column(columnDefinition = "TEXT")
    private List<String> images;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name="tenant_id",nullable = false)
    private UUID tenantId;
    @Column(name="created_at",nullable = false)
    private Timestamp createdAt;
    @Column(name="updated_at",nullable = false)
    private Timestamp updatedAt;
}
