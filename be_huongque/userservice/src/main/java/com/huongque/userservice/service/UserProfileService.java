package com.huongque.userservice.service;

import com.huongque.userservice.dto.UserProfileDto;
import com.huongque.userservice.entity.UserProfile;
import com.huongque.userservice.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private  final UserProfileRepository userProfileRepository;

    public UserProfileDto getUserProfile(UUID userId) {
        UserProfile user = userProfileRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new UserProfileDto(
                user.getId(),
                user.getFullName(),
                user.getDob(),
                user.getGmail(),
                user.getPhone()
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
        user.setId(userDto.getId());
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
    public List<UserProfileDto> getAllUserProfiles() {
        return userProfileRepository.findAll()
                .stream()
                .map(user -> new UserProfileDto(
                        user.getId(),
                        user.getFullName(),
                        user.getDob(),
                        user.getGmail(),
                        user.getPhone()
                ))
                .collect(Collectors.toList());
    }
        public void deleteUserProfile(UUID id) {
                UserProfile user = userProfileRepository.findById(id)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
                userProfileRepository.delete(user);
        }
    
}
