package com.huongque.authservice.controller;

import com.huongque.authservice.entity.PasswordResetToken;
import com.huongque.authservice.repository.PasswordResetTokenRepository;
import com.huongque.authservice.service.EmailService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.huongque.authservice.config.JwtUtils;
import com.huongque.authservice.dto.AuthRequest;
import com.huongque.authservice.dto.AuthResponse;
import com.huongque.authservice.dto.EmailRequest;
import com.huongque.authservice.dto.ResetPasswordRequest;
import com.huongque.authservice.entity.EmailVerificationToken;
import com.huongque.authservice.entity.User;
import com.huongque.authservice.exception.ErrorResponse;
import com.huongque.authservice.exception.InvalidPasswordException;
import com.huongque.authservice.repository.EmailVerificationTokenRepository;
import com.huongque.authservice.repository.UserRepository;
import com.huongque.authservice.service.AuthService;

import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final EmailVerificationTokenRepository emailVerificationTokenRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final JwtUtils jwtUtils;
    @Autowired
    private UserRepository userRepository;


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AuthRequest request) {
        authService.register(request);
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthResponse> refreshToken(@RequestBody String refreshToken) {
        return ResponseEntity.ok(authService.refreshToken(refreshToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody String refreshToken) {
        return ResponseEntity.ok(authService.logout(refreshToken));
    }

    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam("token") String token) {
        EmailVerificationToken verificationToken = emailVerificationTokenRepository.findByToken(token).orElseThrow(() -> new RuntimeException("Invalid token"));

        User user = verificationToken.getUser();
        if (user.isEnabled()) {
            return ResponseEntity.ok("Email already verified");
        }
        if (verificationToken.getExpirationTime().before(new java.util.Date())) {
            return ResponseEntity.badRequest().body("Token expired");

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

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody EmailRequest request) {
        
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            String token = UUID.randomUUID().toString();

            PasswordResetToken resetToken = new PasswordResetToken();
            resetToken.setToken(token);
            resetToken.setUser(user);
            resetToken.setExpiryDate(LocalDateTime.now().plusMinutes(30));

            tokenRepository.save(resetToken);
            emailService.sendPasswordResetEmail(request.getEmail(), token);

        }


        return ResponseEntity.ok("Check your email for reset password link.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
            @RequestBody ResetPasswordRequest request) {
        Optional<PasswordResetToken> optionalToken = tokenRepository.findByToken(request.getToken());
        if (optionalToken.isEmpty()) {
            return ResponseEntity.badRequest().body("Token không hợp lệ");
        }

        PasswordResetToken resetToken = optionalToken.get();
        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Token đã hết hạn");
        }

        User user = resetToken.getUser();
        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword())); // gọi hàm hash mật khẩu
        userRepository.save(user);

        tokenRepository.delete(resetToken); // xoá token sau khi dùng
        return ResponseEntity.ok("Đặt lại mật khẩu thành công.");
    }
     @GetMapping("/social-login-success")
public void socialLoginSuccess(OAuth2AuthenticationToken authentication, HttpServletResponse response) throws IOException {
    OAuth2User oauthUser = authentication.getPrincipal();
    String email = oauthUser.getAttribute("email");

  
    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found after OAuth login"));
    List<String> roles = user.getRoles().stream()
            .map(role -> role.getName())
            .toList();
    String accessToken = jwtUtils.generateAccessToken(email, roles);
    String refreshToken = jwtUtils.generateRefreshToken(email);
    String redirectUrl = "http://localhost:3000/login/social-login-success?access_token=" + accessToken + "&refresh_token=" + refreshToken;

    response.sendRedirect(redirectUrl);
}


    @GetMapping("/social-login-failure")
    public ResponseEntity<String> socialLoginFailure() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed!");
    }

    @PostMapping("/social-login")
    public ResponseEntity<AuthResponse> socialLogin(
            @RequestParam("login_type") String loginType,
            HttpServletRequest request) {
        return ResponseEntity.ok(new AuthResponse("accessToken", "refreshToken"));
    }


}
