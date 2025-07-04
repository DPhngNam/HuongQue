package com.huongque.authservice.dto;

import lombok.Data;

@Data
public class SystemAuthDto {
    private String email;
    private String password;
    private boolean enabled;
    private String role;

    // Getters and Setters
}
