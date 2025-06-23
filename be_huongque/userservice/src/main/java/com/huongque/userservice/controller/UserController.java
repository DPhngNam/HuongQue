package com.huongque.userservice.controller;

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

    @GetMapping("/{email}")
    public ResponseEntity<UserProfileDto> getUserProfile(@PathVariable String email){
        return ResponseEntity.ok(userProfileService.getUserProfile(email));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserProfileDto> updateUserProfile(@PathVariable UUID id, @RequestBody UserProfileDto userProfileDto){
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

}
