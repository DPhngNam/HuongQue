package com.huongque.authservice.controller;

import com.huongque.authservice.dto.UserResponse;
import com.huongque.authservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/profile")
    public UserResponse getProfile(@RequestHeader("X-User-Id") UUID userId){
        return  userService.getProfile(userId);
    }
}
