package com.huongque.userservice.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user_profile")
public class UserProfile {
    @Id
    private UUID id;

    private String fullName;
    private LocalDate dob;
    private  String gmail;
    private String phone;
}
