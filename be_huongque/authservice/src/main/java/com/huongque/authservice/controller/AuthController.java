package com.huongque.authservice.controller;

import com.huongque.authservice.client.UserProfileService;

import com.huongque.authservice.dto.AuthRequest;
import com.huongque.authservice.dto.AuthResponse;
import com.huongque.authservice.dto.RegisterRequest;
import com.huongque.authservice.entity.EmailVerificationToken;
import com.huongque.authservice.entity.User;
import com.huongque.authservice.exception.ErrorResponse;
import com.huongque.authservice.exception.InvalidPasswordException;
import com.huongque.authservice.repository.EmailVerificationTokenRepository;
import com.huongque.authservice.repository.UserRepository;
import com.huongque.authservice.service.AuthService;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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
    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<Object> handleInvalidPasswordException(InvalidPasswordException ex) {
        // Trả về 401 cho mật khẩu sai
        return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Object> handleRuntimeException(RuntimeException ex) {
        // Trả về 400 cho các lỗi khác như không tìm thấy user
        return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), HttpStatus.BAD_REQUEST);
    }





}
