package com.huongque.authservice.service;

import com.huongque.authservice.config.JwtUtils;
import com.huongque.authservice.dto.AuthRequest;
import com.huongque.authservice.dto.AuthResponse;
import com.huongque.authservice.dto.RegisterRequest;
import com.huongque.authservice.entity.User;
import com.huongque.authservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    public void register(RegisterRequest request){
        if(userRepository.existsByUsername(request.getUsername())){
            throw new RuntimeException("Username is already taken!");
        }

        User user = User.builder()
                .username(request.getUsername())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .build();
        userRepository.save(user);

    }

    public AuthResponse login(AuthRequest request){
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(()->new RuntimeException("User not found"));
        if(!passwordEncoder.matches(request.getPassword(),user.getPasswordHash())){
            throw new RuntimeException("Invalid password");
        }
        String accessToken = jwtUtils.generateAccessToken(user.getUsername());
        String refreshToken = jwtUtils.generateRefreshToken(user.getUsername());
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
}
