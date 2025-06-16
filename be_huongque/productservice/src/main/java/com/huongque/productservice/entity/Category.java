package com.huongque.productservice.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="category")
@Data
public class Category {
    @Id
    private UUID id;

    @Column(name="name",nullable = false)
    private String name;

     @Column(unique = true)
    private String slug;



   @CreationTimestamp // Automatically sets the timestamp on entity creation
    @Column(name = "created_at", nullable = false, updatable = false) // Ensures it's not null and can't be changed after creation
    private LocalDateTime createdAt;

    @UpdateTimestamp // Automatically updates the timestamp on entity modification
    @Column(name = "updated_at", nullable = false) // Ensures it's not null and updates
    private LocalDateTime updatedAt;
public Category(UUID id, String name) {
    this.id = id;
    this.name = name;
}
public Category(UUID id, String name, String slug) {
    this.id = id;
    this.name = name;
    this.slug = slug;
}

}
