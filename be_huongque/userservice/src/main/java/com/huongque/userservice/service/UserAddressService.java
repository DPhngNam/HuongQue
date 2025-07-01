package com.huongque.userservice.service;

import com.huongque.userservice.dto.CreateUserAddressDto;
import com.huongque.userservice.dto.UpdateUserAddressDto;
import com.huongque.userservice.dto.UserAddressDto;
import com.huongque.userservice.entity.UserAddress;
import com.huongque.userservice.entity.UserProfile;
import com.huongque.userservice.exception.AddressNotFoundException;
import com.huongque.userservice.exception.UserNotFoundException;
import com.huongque.userservice.mapper.UserAddressMapper;
import com.huongque.userservice.repository.UserAddressRepository;
import com.huongque.userservice.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserAddressService {

    private final UserAddressRepository userAddressRepository;
    private final UserProfileRepository userProfileRepository;
    private final UserAddressMapper userAddressMapper;

    public List<UserAddressDto> getAllAddressesByUserId(UUID userId) {
        List<UserAddress> addresses = userAddressRepository.findByUserProfileId(userId);
        return addresses.stream()
                .map(userAddressMapper::toDto)
                .collect(Collectors.toList());
    }

    public UserAddressDto getAddressById(UUID addressId) {
        UserAddress userAddress = userAddressRepository.findById(addressId)
                .orElseThrow(() -> new AddressNotFoundException("Address not found with id: " + addressId));
        return userAddressMapper.toDto(userAddress);
    }

    public UserAddressDto createAddress(UUID userId, CreateUserAddressDto createDto) {
        UserProfile userProfile = userProfileRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));

        UserAddress userAddress = userAddressMapper.toEntity(createDto, userProfile);
        UserAddress savedAddress = userAddressRepository.save(userAddress);
        
        return userAddressMapper.toDto(savedAddress);
    }

    public UserAddressDto updateAddress(UUID addressId, UpdateUserAddressDto updateDto) {
        UserAddress userAddress = userAddressRepository.findById(addressId)
                .orElseThrow(() -> new AddressNotFoundException("Address not found with id: " + addressId));

        userAddressMapper.updateEntity(userAddress, updateDto);
        UserAddress updatedAddress = userAddressRepository.save(userAddress);
        
        return userAddressMapper.toDto(updatedAddress);
    }

    public void deleteAddress(UUID addressId) {
        if (!userAddressRepository.existsById(addressId)) {
            throw new AddressNotFoundException("Address not found with id: " + addressId);
        }
        userAddressRepository.deleteById(addressId);
    }

    public boolean isAddressOwnedByUser(UUID addressId, UUID userId) {
        return userAddressRepository.findById(addressId)
                .map(address -> address.getUserProfile().getId().equals(userId))
                .orElse(false);
    }
}
