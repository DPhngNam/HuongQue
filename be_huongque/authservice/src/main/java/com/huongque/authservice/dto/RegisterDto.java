package com.huongque.authservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class RegisterDto {
    @NotEmpty(message = "Username is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotEmpty(message = "Password is required")
    @Size(min = 8 , message = "Password must be at least 8 characters long")
    private String password;
    @NotEmpty(message = "Confirm Password is required")
    @Size(min = 8 , message = "Confirm Password must be at least 8 characters long")
    private String confirmPassword;
}
