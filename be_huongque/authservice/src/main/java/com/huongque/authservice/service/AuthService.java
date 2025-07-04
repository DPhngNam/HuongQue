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
import com.huongque.authservice.dto.SystemAuthDto;
import com.huongque.authservice.dto.UserProfileDto;
import com.huongque.authservice.entity.EmailVerificationToken;
import com.huongque.authservice.entity.Role;
import com.huongque.authservice.entity.User;
import com.huongque.authservice.entity.UserRole;
import com.huongque.authservice.entity.UserRoleId;
import com.huongque.authservice.exception.InvalidPasswordException;
import com.huongque.authservice.exception.UsernameAlreadyTakenException;
import com.huongque.authservice.repository.EmailVerificationTokenRepository;
import com.huongque.authservice.repository.RoleRepository;
import com.huongque.authservice.repository.UserRepository;
import com.huongque.authservice.repository.UserRoleRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
   private final EmailVerificationTokenRepository emailVerificationTokenRepository;

    private final EmailService emailService;
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
    private final UserProfileService userProfileService;
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
        System.out.println("Tạo người dùng thành công: " + user);

        String token = UUID.randomUUID().toString();
        EmailVerificationToken verificationToken = new EmailVerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);
        verificationToken.setExpirationTime(new Date(System.currentTimeMillis()+10*60*1000)); // 10 phút
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
        String accessToken = jwtUtils.generateAccessToken(user.getEmail(), user.getId(), roles);
        String refreshToken = jwtUtils.generateRefreshToken(user.getEmail(), user.getId());
        return new AuthResponse(accessToken, refreshToken);
    }
    public AuthResponse refreshToken(String refreshToken){
        if(!jwtUtils.isTokenValid(refreshToken)){
            throw new RuntimeException("Refresh token không hợp lệ");
        }
        UUID userId = jwtUtils.extractUserId(refreshToken);
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
        String username = user.getEmail();
        List<String> roles = user.getRoles().stream()
                .map(role -> role.getName())
                .toList();
        String newAccessToken = jwtUtils.generateAccessToken(username, user.getId(), roles);
        String newRefreshToken = jwtUtils.generateRefreshToken(username, user.getId());

        return new AuthResponse(newAccessToken, newRefreshToken);
    }

    public String logout(String refreshToken){
        if(!jwtUtils.isTokenValid(refreshToken)){
            throw new RuntimeException("Refresh token không hợp lệ");
        }
        return "Đăng xuất thành công";
    }

    @Transactional
public UUID systemRegister(SystemAuthDto dto) {
    if (userRepository.existsByEmail(dto.getEmail())) {
        throw new UsernameAlreadyTakenException("Tên đăng nhập đã được sử dụng!");
    }

    // 1. Tạo user
    User user = User.builder()
            .email(dto.getEmail())
            .passwordHash(passwordEncoder.encode(dto.getPassword()))
            .enabled(dto.isEnabled())
            .build();
    userRepository.save(user);

    // 2. Tìm role
    Role role = roleRepository.findByName(dto.getRole())
            .orElseThrow(() -> new RuntimeException("Không tìm thấy vai trò: " + dto.getRole()));

    // 3. Tạo UserRoleId
    UserRoleId userRoleId = new UserRoleId(user.getId(), role.getId());

    // 4. Tạo UserRole
    UserRole userRole = new UserRole();
    userRole.setId(userRoleId);
    userRole.setUser(user);
    userRole.setRole(role);

    userRoleRepository.save(userRole);

    // Gọi Feign client lưu user profile vào userservice
    try {
        UserProfileDto profile = UserProfileDto.builder()
            .id(user.getId())
            .gmail(user.getEmail())
            .build();
        userProfileService.createUserProfile("true", profile);
    } catch (Exception e) {
        logger.error("Không thể lưu user profile vào userservice: {}", e.getMessage());
    }

    logger.info("✅ Tạo user hệ thống thành công với email: {}", user.getEmail());
    
    return user.getId(); // Trả về UUID để service gọi lưu tiếp
}

}
