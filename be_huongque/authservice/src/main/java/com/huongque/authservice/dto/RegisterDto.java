package com.huongque.authservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class RegisterDto {
    @NotEmpty(message = "Username is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotEmpty(message = "Password is required")
    @Min(value = 8 , message = "Password must be at least 8 characters long")
    private String password;
    @NotEmpty(message = "Confirm Password is required")
    @Min(value = 8 , message = "Confirm Password must be at least 8 characters long")
    private String confirmPassword;
}
