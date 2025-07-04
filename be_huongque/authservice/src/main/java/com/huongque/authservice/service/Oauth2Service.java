package com.huongque.authservice.service;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.huongque.authservice.client.UserProfileService;
import com.huongque.authservice.dto.UserProfileDto;
import com.huongque.authservice.entity.User;
import com.huongque.authservice.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class Oauth2Service implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {


    private final UserRepository userRepository;
    @Override
public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
    OAuth2User oauth2User = new DefaultOAuth2UserService().loadUser(userRequest);
    String email = oauth2User.getAttribute("email");

    userRepository.findByEmail(email).orElseGet(() -> {
        User newUser = User.builder()
                .email(email)
                .enabled(true)
                .passwordHash("OAUTH@_USER")
                .build();
        return userRepository.save(newUser);
    });

    return oauth2User;
}
}
