package com.huongque.authservice.service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.huongque.authservice.client.UserProfileService;
import com.huongque.authservice.config.JwtUtils;
import com.huongque.authservice.dto.AuthRequest;
import com.huongque.authservice.dto.AuthResponse;
import com.huongque.authservice.dto.RegisterDto;
import com.huongque.authservice.dto.UserProfileDto;
import com.huongque.authservice.entity.EmailVerificationToken;
import com.huongque.authservice.entity.User;
import com.huongque.authservice.exception.InvalidPasswordException;
import com.huongque.authservice.exception.UsernameAlreadyTakenException;
import com.huongque.authservice.repository.EmailVerificationTokenRepository;
import com.huongque.authservice.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private final UserProfileService userProfileService;
    private final EmailVerificationTokenRepository emailVerificationTokenRepository;

    private final EmailService emailService;
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    @Transactional
    public void register(RegisterDto request){

        if(userRepository.existsByEmail(request.getEmail())){
            throw new UsernameAlreadyTakenException("Tên đăng nhập đã được sử dụng!");
        }

        User user = User.builder()
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .build();
        userRepository.save(user);

        UserProfileDto userProfileDto = UserProfileDto.builder()
                .id(user.getId())
                .gmail(user.getEmail())
                .build();

        try {
            userProfileService.createUserProfile(userProfileDto);
            System.out.println("Tạo hồ sơ người dùng thành công: " + userProfileDto);
        } catch (Exception e) {
            logger.error("Không thể tạo hồ sơ người dùng", e.getMessage(), e);
            throw new RuntimeException("Không thể tạo hồ sơ người dùng", e);
        }
        String token = UUID.randomUUID().toString();
        EmailVerificationToken verificationToken = new EmailVerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);
        verificationToken.setExpirationTime(new Date(System.currentTimeMillis()+60*1000)); // 1 phút
        emailVerificationTokenRepository.save(verificationToken);

        try {
            emailService.sendVerificationEmail(user.getEmail(), token);
        }
        catch (Exception e){
            logger.error("Không thể gửi email xác thực", e.getMessage(), e);
            throw new RuntimeException("Không thể gửi email xác thực", e);
        }
    }

    public AuthResponse login(AuthRequest request){
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        if(!user.isEnabled()){
            throw new RuntimeException("Người dùng chưa xác thực");
        }
        if(!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())){
            throw new InvalidPasswordException("Mật khẩu không đúng");
        }
        List<String> roles = user.getRoles().stream()
                .map(role -> role.getName())
                .toList();
        String accessToken = jwtUtils.generateAccessToken(user.getEmail(), roles);
        String refreshToken = jwtUtils.generateRefreshToken(user.getEmail());
        return new AuthResponse(accessToken, refreshToken);
    }
    public AuthResponse refreshToken(String refreshToken){
        if(!jwtUtils.isTokenValid(refreshToken)){
            throw new RuntimeException("Refresh token không hợp lệ");
        }
        String username = jwtUtils.extractUsername(refreshToken);
        String newAccessToken = jwtUtils.generateAccessToken(username, List.of());
        String newRefreshToken = jwtUtils.generateRefreshToken(username);

        return new AuthResponse(newAccessToken, newRefreshToken);
    }

    public String logout(String refreshToken){
        if(!jwtUtils.isTokenValid(refreshToken)){
            throw new RuntimeException("Refresh token không hợp lệ");
        }
        return "Đăng xuất thành công";
    }
}
