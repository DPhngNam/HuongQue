package com.huongque.userservice.mapper;

import com.huongque.userservice.dto.CreateUserAddressDto;
import com.huongque.userservice.dto.UpdateUserAddressDto;
import com.huongque.userservice.dto.UserAddressDto;
import com.huongque.userservice.entity.UserAddress;
import com.huongque.userservice.entity.UserProfile;
import org.springframework.stereotype.Component;

@Component
public class UserAddressMapper {

    public UserAddressDto toDto(UserAddress userAddress) {
        if (userAddress == null) {
            return null;
        }
        
        return UserAddressDto.builder()
                .id(userAddress.getId())
                .address(userAddress.getAddress())
                .userProfileId(userAddress.getUserProfile() != null ? userAddress.getUserProfile().getId() : null)
                .build();
    }

    public UserAddress toEntity(CreateUserAddressDto createDto, UserProfile userProfile) {
        if (createDto == null) {
            return null;
        }
        
        return UserAddress.builder()
                .address(createDto.getAddress())
                .userProfile(userProfile)
                .build();
    }

    public void updateEntity(UserAddress userAddress, UpdateUserAddressDto updateDto) {
        if (updateDto != null) {
            userAddress.setAddress(updateDto.getAddress());
        }
    }
}
