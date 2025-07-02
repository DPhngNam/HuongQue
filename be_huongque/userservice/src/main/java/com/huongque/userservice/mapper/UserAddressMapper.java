package com.huongque.userservice.mapper;
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
                .name(userAddress.getName())           
                .phone(userAddress.getPhone())        
                .type(userAddress.getType())           
                .userProfileId(userAddress.getUserProfile() != null ? userAddress.getUserProfile().getId() : null)
                .build();
    }

    public UserAddress toEntity(UserAddressDto userAddressDto, UserProfile userProfile) {
        if (userAddressDto == null) {
            return null;
        }

        return UserAddress.builder()
                .id(userAddressDto.getId())
                .address(userAddressDto.getAddress())
                .name(userAddressDto.getName())       
                .phone(userAddressDto.getPhone())      
                .type(userAddressDto.getType())        
                .userProfile(userProfile)
                .build();
    }

    public void updateEntity(UserAddress userAddress, UserAddressDto updateDto) {
        if (updateDto != null) {
            userAddress.setAddress(updateDto.getAddress());
            userAddress.setName(updateDto.getName());        
            userAddress.setPhone(updateDto.getPhone());      
            userAddress.setType(updateDto.getType());        
        }
    }
}
