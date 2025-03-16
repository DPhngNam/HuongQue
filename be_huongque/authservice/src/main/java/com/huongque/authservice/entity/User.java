package com.huongque.authservice.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import java.security.Timestamp;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "UUID")
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
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();
}
