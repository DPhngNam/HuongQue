package com.huongque.authservice.service;

import java.util.Date;
import java.util.UUID;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.huongque.authservice.client.UserProfileService;
import com.huongque.authservice.config.JwtUtils;
import com.huongque.authservice.dto.AuthRequest;
import com.huongque.authservice.dto.AuthResponse;
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
    private final JavaMailSender javaMailSender;



    @Transactional
    public void register(AuthRequest request){
        if(userRepository.existsByEmail(request.getEmail())){
            throw new UsernameAlreadyTakenException("Username is already taken!");
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
        } catch (Exception e) {
            throw new RuntimeException("Failed to create user profile", e);
        }
        String token = UUID.randomUUID().toString();
        EmailVerificationToken verificationToken = new EmailVerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);
        verificationToken.setExpirationTime(new Date(System.currentTimeMillis()+24*60*60*1000)); // 24h
        emailVerificationTokenRepository.save(verificationToken);

        try {
            sendVerificationEmail(user.getEmail(), token);
        }
        catch (Exception e){
            throw  new RuntimeException("Failed to send verification email", e);
        }


    }

    public AuthResponse login(AuthRequest request){
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(()->new RuntimeException("User not found"));
        if(!passwordEncoder.matches(request.getPassword(),user.getPasswordHash())){
            throw new InvalidPasswordException("Invalid password");
        }
        String accessToken = jwtUtils.generateAccessToken(user.getEmail());
        String refreshToken = jwtUtils.generateRefreshToken(user.getEmail());
        return new AuthResponse(accessToken,refreshToken);
    }
    public AuthResponse refreshToken(String refreshToken){
        if(!jwtUtils.isTokenValid(refreshToken)){
            throw new RuntimeException("Invalid refresh token");
        }
        String username = jwtUtils.extractUsername(refreshToken);
        String newAccessToken = jwtUtils.generateAccessToken(username);
        String newRefreshToken = jwtUtils.generateRefreshToken(username);

        return  new AuthResponse(newAccessToken,newRefreshToken);
    }

    public String logout(String refreshToken){
        if(!jwtUtils.isTokenValid(refreshToken)){
            throw new RuntimeException("Invalid refresh token");
        }
        return "Logout success";
    }
    private void sendVerificationEmail(String toEmail, String token){
        String subject = "Verify your email";
        String body = "Click the link to verify your email: " +
                "http://localhost:8081/auth/verify-email?token=" + token;
        String message = "Click the link to verify your email: " +
                "http://localhost:8081/auth/verify-email?token=" + token;
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(toEmail);
        email.setSubject(subject);
        email.setText(message);
        javaMailSender.send(email);
    }

}
