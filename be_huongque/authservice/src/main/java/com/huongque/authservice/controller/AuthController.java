package com.huongque.authservice.controller;

import com.huongque.authservice.client.UserProfileService;
import com.huongque.authservice.config.JwtUtils;
import com.huongque.authservice.dto.AuthRequest;
import com.huongque.authservice.dto.AuthResponse;
import com.huongque.authservice.dto.RegisterRequest;
import com.huongque.authservice.entity.EmailVerificationToken;
import com.huongque.authservice.entity.User;
import com.huongque.authservice.repository.EmailVerificationTokenRepository;
import com.huongque.authservice.repository.UserRepository;
import com.huongque.authservice.service.AuthService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final EmailVerificationTokenRepository emailVerificationTokenRepository;


    @Autowired
    private UserProfileService userProfileService;
    @Autowired
    private UserRepository userRepository;


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
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
    @PostMapping("/logout")
    public ResponseEntity<String> logout (@RequestBody String refreshToken){
        return  ResponseEntity.ok(authService.logout(refreshToken));
    }

    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token){
        EmailVerificationToken verificationToken = emailVerificationTokenRepository.findByToken(token).orElseThrow(()->new RuntimeException("Invalid token"));

        User user = verificationToken.getUser();
        if (user.isEnabled()) {
            return ResponseEntity.ok("Email already verified");
        }
        if (verificationToken.getExpirationTime().before(new java.util.Date())) {
            return  ResponseEntity.badRequest().body("Token expired");

        }
        user.setEnabled(true);
        userRepository.save(user);

        emailVerificationTokenRepository.delete(verificationToken);
        return ResponseEntity.ok("Email verified successfully");

    }




}
