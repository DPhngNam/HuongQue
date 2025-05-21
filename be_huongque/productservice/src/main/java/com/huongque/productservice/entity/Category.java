package com.huongque.productservice.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name="category")
@Data
public class Category {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.UUID)
    private UUID id;
    @Column(name="name",nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name="created_at",nullable = false)
    private Timestamp createdAt;
    @Column(name="updated_at",nullable = false)
    private Timestamp updatedAt;


}
