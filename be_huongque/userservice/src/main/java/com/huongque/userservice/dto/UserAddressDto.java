package com.huongque.userservice.dto;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAddressDto {
    private UUID id;
    private String address;
    private UUID userProfileId;
    private String name;
    private String phone;
    private String type;
}
