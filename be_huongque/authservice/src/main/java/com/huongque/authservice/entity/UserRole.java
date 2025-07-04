package com.huongque.authservice.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_roles")
public class UserRole {
    @EmbeddedId
    private UserRoleId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("roleId")
    @JoinColumn(name = "role_id")
    private Role role;

    @CreationTimestamp
    private Timestamp createdAt;
}
