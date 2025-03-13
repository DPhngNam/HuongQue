package com.huongque.authservice.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import java.security.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name= "UUID",strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @Column(nullable = false,unique = true)
    private  String username;
    @Column(nullable = false)
    private  String passwordHash;

    @Column(nullable = false,unique = true)
    private  String email;

    @Column(name = "oauth2_provider")
    private String oauth2Provider;

    @Column(name = "oauth2_id")
    private String oauth2Id;

    @CreationTimestamp
    private Timestamp createdAt;

    @CreationTimestamp
    private Timestamp updatedAt;
}
