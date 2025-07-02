package com.huongque.userservice.controller;



import com.huongque.userservice.dto.UserAddressDto;
import com.huongque.userservice.service.UserAddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserAddressController {

    private final UserAddressService userAddressService;

    // Get all addresses for current user
    @GetMapping("/me/addresses")
    public ResponseEntity<List<UserAddressDto>> getCurrentUserAddresses(
            @RequestHeader("X-User-Id") String userId) {
        UUID uuid = UUID.fromString(userId);
        List<UserAddressDto> addresses = userAddressService.getAllAddressesByUserId(uuid);
        return ResponseEntity.ok(addresses);
    }

    // Get all addresses for a specific user (admin endpoint)
    @GetMapping("/{userId}/addresses")
    public ResponseEntity<List<UserAddressDto>> getUserAddresses(@PathVariable UUID userId) {
        List<UserAddressDto> addresses = userAddressService.getAllAddressesByUserId(userId);
        return ResponseEntity.ok(addresses);
    }

    // Get specific address by ID
    @GetMapping("/addresses/{addressId}")
    public ResponseEntity<UserAddressDto> getAddressById(
            @PathVariable UUID addressId,
            @RequestHeader("X-User-Id") String userId) {
        UUID userUuid = UUID.fromString(userId);
        
        // Check if address belongs to the user
        if (!userAddressService.isAddressOwnedByUser(addressId, userUuid)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        
        UserAddressDto address = userAddressService.getAddressById(addressId);
        return ResponseEntity.ok(address);
    }

    // Create new address for current user
    @PostMapping("/me/addresses")
    public ResponseEntity<UserAddressDto> createAddress(
            @RequestHeader("X-User-Id") String userId,
            @Valid @RequestBody UserAddressDto createDto) {
        UUID uuid = UUID.fromString(userId);
        UserAddressDto createdAddress = userAddressService.createAddress(uuid, createDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAddress);
    }

    // Update address
    @PutMapping("/addresses/{addressId}")
    public ResponseEntity<UserAddressDto> updateAddress(
            @PathVariable UUID addressId,
            @RequestHeader("X-User-Id") String userId,
            @Valid @RequestBody UserAddressDto updateDto) {
        UUID userUuid = UUID.fromString(userId);
        
        // Check if address belongs to the user
        if (!userAddressService.isAddressOwnedByUser(addressId, userUuid)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        
        UserAddressDto updatedAddress = userAddressService.updateAddress(addressId, updateDto);
        return ResponseEntity.ok(updatedAddress);
    }

    // Delete address
    @DeleteMapping("/addresses/{addressId}")
    public ResponseEntity<Void> deleteAddress(
            @PathVariable UUID addressId,
            @RequestHeader("X-User-Id") String userId) {
        UUID userUuid = UUID.fromString(userId);
        
        // Check if address belongs to the user
        if (!userAddressService.isAddressOwnedByUser(addressId, userUuid)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        
        userAddressService.deleteAddress(addressId);
        return ResponseEntity.noContent().build();
    }
}
