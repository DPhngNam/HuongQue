package com.huongque.authservice.service;

import com.huongque.authservice.dto.UserResponse;
import com.huongque.authservice.entity.User;
import com.huongque.authservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserResponse getProfile(UUID userId){
        User user = userRepository.findById(userId)
                .orElseThrow(()->new RuntimeException("User not found"));
        return  new UserResponse(user.getUsername(),user.getEmail());
    }
    public UserDetails loadUserById(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + userId));

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPasswordHash(),
                true, true, true, true,
                (Collection<? extends GrantedAuthority>) user.getRoles()
        );
    }

}
