package com.huongque.authservice.controller;

import com.huongque.authservice.dto.AuthRequest;
import com.huongque.authservice.dto.AuthResponse;
import com.huongque.authservice.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AuthRequest request) {
        authService.register(request);
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login (@RequestBody AuthRequest request){
        return  ResponseEntity.ok(authService.login(request));
    }
    @PostMapping("/refresh-token")
    public ResponseEntity<AuthResponse> refreshToken (@RequestBody String refreshToken){
        return  ResponseEntity.ok(authService.refreshToken(refreshToken));
    }
}
