package com.huongque.userservice.controller;

import com.huongque.userservice.dto.FileUploadRequest;
import com.huongque.userservice.dto.UpdateUserDTO;
import com.huongque.userservice.dto.UserProfileDto;
import com.huongque.userservice.service.FileUploadSender;
import com.huongque.userservice.service.UploadResponseConsumer;
import com.huongque.userservice.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserProfileService userProfileService;
    private final UploadResponseConsumer uploadResponseConsumer;
    private final FileUploadSender fileUploadSender;

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


    @PostMapping("/internal")
    public ResponseEntity<UserProfileDto> createUserProfileInternal(
            @RequestHeader("X-INTERNAL-CALL") String internal,
            @RequestBody UserProfileDto userProfileDto) {

        if (!"true".equalsIgnoreCase(internal)) {
            return ResponseEntity.status(401).build();
        }

        return ResponseEntity.ok(userProfileService.createUserProfile(userProfileDto));
    }

    @PostMapping("/me/avatar")
    public ResponseEntity<Map<String, String>> uploadAvatar(
            @RequestHeader("X-User-Id") String userId,
            @RequestParam("file") MultipartFile file
    ) throws Exception {

        FileUploadRequest request = new FileUploadRequest(
                userId,
                file.getOriginalFilename(),
                file.getBytes(),
                file.getContentType()
        );

        fileUploadSender.send(request);
        CompletableFuture<String> future = uploadResponseConsumer.createFuture(userId); // dùng đúng tên hàm của bạn

        String avatarUrl = future.get(10, TimeUnit.SECONDS); // timeout sau 10s

        UUID uuid = UUID.fromString(userId);
        userProfileService.updateAvatarUrl(uuid, avatarUrl); // nếu có

        return ResponseEntity.ok(Map.of("avatarUrl", avatarUrl));
    }


}
