package com.huongque.authservice.config;

import com.huongque.authservice.entity.User;
import com.huongque.authservice.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");

        User user = userRepository.findByEmail(email)
                .orElseThrow(()->new RuntimeException("User not found"));

        String accessToken = jwtUtils.generateAccessToken(user.getId().toString());
        String refreshToken = jwtUtils.generateRefreshToken(user.getId().toString());

        String redirectUrl = "http://localhost:3000/login/success?accessToken=" + accessToken
                + "&refreshToken=" + refreshToken;

        response.sendRedirect(redirectUrl);

    }

}

