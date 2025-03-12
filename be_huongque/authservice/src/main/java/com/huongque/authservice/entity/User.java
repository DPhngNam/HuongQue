package com.huongque.authservice.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import java.security.Timestamp;
import java.util.UUID;


@Entity

public class User {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name='UUID',strategy = "org.hibernate.id.UUIDGenerator")
    private UUID Ii;

    @Column(nullable = false,unique = true)
    private  String username;
    @Column(nullable = false)
    private  String passwordHash;

    @Column(nullable = false,unique = true)
    private  String email;

    @CreationTimestamp
    private Timestamp createdAt;

    @CreationTimestamp
    private Timestamp updatedAt;


}
