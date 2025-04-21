package com.huongque.productservice.entity;

import jakarta.persistence.*;
import lombok.Data;


import java.security.Timestamp;
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

    private Double price;
    private Integer quantity;

    @ElementCollection
    @Column(columnDefinition = "TEXT")
    private List<String> images;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name="tenant_id",nullable = false)
    private UUID tenantId;

    private Timestamp createAt;
    private Timestamp updateAt;
}
