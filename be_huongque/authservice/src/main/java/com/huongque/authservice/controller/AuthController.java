package com.huongque.authservice.controller;

import com.huongque.authservice.entity.PasswordResetToken;
import com.huongque.authservice.entity.Role;
import com.huongque.authservice.repository.PasswordResetTokenRepository;
import com.huongque.authservice.repository.RoleRepository;
import com.huongque.authservice.service.EmailService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
import com.huongque.authservice.dto.RegisterDto;
import com.huongque.authservice.dto.ResetPasswordRequest;
import com.huongque.authservice.dto.SystemAuthDto;
import com.huongque.authservice.entity.EmailVerificationToken;
import com.huongque.authservice.entity.User;
import com.huongque.authservice.entity.UserRole;
import com.huongque.authservice.exception.ErrorResponse;
import com.huongque.authservice.exception.InvalidPasswordException;
import com.huongque.authservice.repository.EmailVerificationTokenRepository;
import com.huongque.authservice.repository.UserRepository;
import com.huongque.authservice.repository.UserRoleRepository;
import com.huongque.authservice.service.AuthService;
import com.huongque.authservice.dto.UserProfileDto;
import com.huongque.authservice.client.UserProfileService;

import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
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
    @Value("${app.frontend-url}")
    private String frontendUrl;
    private final UserProfileService userProfileService;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid RegisterDto request) {
        authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Success");
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
    public void verifyEmail(@RequestParam("token") String token, HttpServletResponse response) throws IOException {
        EmailVerificationToken verificationToken = emailVerificationTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        User user = verificationToken.getUser();
        if (user.isEnabled()) {
            response.sendRedirect(frontendUrl + "/login?status=already");
            return;
        }
        if (verificationToken.getExpirationTime().before(new java.util.Date())) {
            response.sendRedirect(frontendUrl + "/login?status=expired");
            return;
        }

        user.setEnabled(true);

        userRepository.save(user);
        emailVerificationTokenRepository.delete(verificationToken);
        Role defaultRole = roleRepository.findByName("USER")
    .orElseThrow(() -> new RuntimeException("Không tìm thấy vai trò mặc định"));

UserRole userRole = new UserRole();
userRole.setUser(user);
userRole.setRole(defaultRole);


userRoleRepository.save(userRole);

        try {
            UserProfileDto profile = UserProfileDto.builder()
                    .id(user.getId())
                    .gmail(user.getEmail())
                    .build();
            userProfileService.createUserProfile("true", profile);

            response.sendRedirect(frontendUrl + "/login?status=success");
        } catch (Exception e) {
            // Rollback: set lại enabled = false nếu lưu user profile thất bại
            user.setEnabled(false);
            userRepository.save(user);
            // Có thể log lỗi chi tiết ở đây nếu cần
            response.sendRedirect(frontendUrl + "/login?status=profile_error");
            System.err.println(e.getMessage());
        }
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
    public void socialLoginSuccess(OAuth2AuthenticationToken authentication, HttpServletResponse response)
            throws IOException {
        OAuth2User oauthUser = authentication.getPrincipal();
        System.out.println("OAuth2 Attributes: " + oauthUser.getAttributes());

        String email = oauthUser.getAttribute("email");
        

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found after OAuth login"));
        List<String> roles = user.getRoles().stream()
                .map(role -> role.getName())
                .toList();
        // Gọi userservice để lưu thông tin user đăng nhập thành công (cập nhật
        // lastLogin hoặc tạo mới nếu cần)
        

        try {
            UserProfileDto profile = UserProfileDto.builder()
                    .id(user.getId())
                    .gmail(email)
                    .fullName(oauthUser.getAttribute("name"))
                    .avatar(oauthUser.getAttribute("picture"))
                    .build();
           userProfileService.createUserProfile("true", profile);

        } catch (Exception e) {
            System.err.println("[OAuth2] Không thể lưu user profile vào userservice: " + e.getMessage());
        }
          String accessToken = jwtUtils.generateAccessToken(email, user.getId(), roles);
        String refreshToken = jwtUtils.generateRefreshToken(email, user.getId());
        String redirectUrl = "http://localhost:3000/login/social-login-success?access_token=" + accessToken
                + "&refresh_token=" + refreshToken;

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
    @PostMapping("/system-register")
    public ResponseEntity<Map<String, String>> systemRegister(@RequestBody SystemAuthDto dto) {
       UUID userId = authService.systemRegister(dto);
       return ResponseEntity.ok(Map.of("id" , userId.toString()));
    }

}
