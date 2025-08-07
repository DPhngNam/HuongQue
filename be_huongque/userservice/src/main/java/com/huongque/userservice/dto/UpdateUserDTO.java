package com.huongque.userservice.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class UpdateUserDTO {
    private String avatar;
    private String fullName;
    private LocalDate dob;
    private String gmail;
    private String phone;
}
