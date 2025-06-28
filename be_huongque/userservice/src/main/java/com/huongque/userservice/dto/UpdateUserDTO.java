package com.huongque.userservice.dto;

import jakarta.persistence.Column;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateUserDTO {
    private String avatar;
    private String fullName;
    private LocalDate dob;
    private String gmail;
    private String phone;
}
