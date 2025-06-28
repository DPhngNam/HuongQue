package com.huongque.userservice.service;

import com.huongque.userservice.dto.UpdateUserDTO;
import com.huongque.userservice.dto.UserProfileDto;
import com.huongque.userservice.entity.UserProfile;
import com.huongque.userservice.mapper.UserProfileMapper;
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

    private final UserProfileRepository userProfileRepository;
    private final UserProfileMapper userProfileMapper;

    public UserProfileDto getUserProfile(UUID userId) {
        UserProfile user = userProfileRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return userProfileMapper.toDto(user);
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
        user.setAvatar(userDto.getAvatar());
        userProfileRepository.save(user);
        return userProfileMapper.toDto(user);
    }

    public List<UserProfileDto> getAllUserProfiles() {
        return userProfileRepository.findAll()
                .stream()
                .map(userProfileMapper::toDto)
                .collect(Collectors.toList());
    }

    public void deleteUserProfile(UUID id) {
        UserProfile user = userProfileRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        userProfileRepository.delete(user);
    }

    public UserProfileDto partialUpdateUserProfile(UUID id, UpdateUserDTO req) {
        UserProfile profile = userProfileRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if (req.getFullName() != null) profile.setFullName(req.getFullName());
        if (req.getDob() != null) profile.setDob(req.getDob());
        if (req.getPhone() != null) profile.setPhone(req.getPhone());
        if (req.getGmail() != null) profile.setGmail(req.getGmail());
        if (req.getAvatar() != null) profile.setAvatar(req.getAvatar());
        userProfileRepository.save(profile);
        return userProfileMapper.toDto(profile);
    }

}
