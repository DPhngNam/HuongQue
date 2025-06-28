package com.huongque.userservice.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileDto {
    private UUID id;
    private String avatar;
    private String fullName;
    private LocalDate dob;
    private String gmail;
    private String phone;
}
