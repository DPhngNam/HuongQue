package com.huongque.userservice.service;

import com.huongque.userservice.dto.UserProfileDto;
import com.huongque.userservice.entity.UserProfile;
import com.huongque.userservice.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private  final UserProfileRepository userProfileRepository;

    public UserProfileDto getUserProfile(UUID id) {
        UserProfile userProfile = userProfileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return  new UserProfileDto(
                userProfile.getId(),
                userProfile.getFullName(),
                userProfile.getDob(),
                userProfile.getGmail(),
                userProfile.getPhone()
        );
    }

    public UserProfileDto updateUserProfile(UUID userId, UserProfileDto userDto) {
        UserProfile user = userProfileRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        user.setFullName(userDto.getFullName());
        user.setDob(userDto.getDob());
        user.setPhone(userDto.getPhone());
        userProfileRepository.save(user);
        return userDto;
    }
    public UserProfileDto createUserProfile(UserProfileDto userDto) {
        UserProfile user = new UserProfile();
        user.setFullName(userDto.getFullName());
        user.setDob(userDto.getDob());
        user.setGmail(userDto.getGmail());
        user.setPhone(userDto.getPhone());
        userProfileRepository.save(user);
        return new UserProfileDto(
                user.getId(),
                user.getFullName(),
                user.getDob(),
                user.getGmail(),
                user.getPhone()
        );
    }
}
