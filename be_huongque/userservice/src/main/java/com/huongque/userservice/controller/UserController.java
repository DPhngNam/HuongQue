package com.huongque.userservice.controller;

import com.huongque.userservice.dto.UpdateUserDTO;
import com.huongque.userservice.dto.UserProfileDto;
import com.huongque.userservice.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserProfileService userProfileService;

    @GetMapping
    public ResponseEntity<List<UserProfileDto>> getAllUserProfiles() {
        return ResponseEntity.ok(userProfileService.getAllUserProfiles());
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileDto> getCurrentUserProfile(@RequestHeader("X-User-Id") String userId) {
        System.out.println("User ID from header: " + userId);
        UUID uuid = UUID.fromString(userId);
        return ResponseEntity.ok(userProfileService.getUserProfile(uuid));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserProfileDto> updateUserProfile(@PathVariable UUID id, @RequestBody UserProfileDto userProfileDto) {
        return ResponseEntity.ok(userProfileService.updateUserProfile(id, userProfileDto));
    }

    @PostMapping
    public ResponseEntity<UserProfileDto> createUserProfile(@RequestBody UserProfileDto userProfileDto) {
        return ResponseEntity.ok(userProfileService.createUserProfile(userProfileDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserProfile(@PathVariable UUID id) {
        userProfileService.deleteUserProfile(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UserProfileDto> patchUserProfile(@PathVariable UUID id, @RequestBody UpdateUserDTO updateUserDTO) {
        return ResponseEntity.ok(userProfileService.partialUpdateUserProfile(id, updateUserDTO));
    }

    @PatchMapping("/me")
    public ResponseEntity<UserProfileDto> patchCurrentUserProfile(
            @RequestHeader("X-User-Id") String userId,
            @RequestBody UpdateUserDTO updateUserDTO) {
        UUID uuid = UUID.fromString(userId);
        return ResponseEntity.ok(userProfileService.partialUpdateUserProfile(uuid, updateUserDTO));
    }

}
