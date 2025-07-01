package com.huongque.userservice.dto;

import lombok.*;

import jakarta.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateUserAddressDto {
    @NotBlank(message = "Address is required")
    private String address;
}
