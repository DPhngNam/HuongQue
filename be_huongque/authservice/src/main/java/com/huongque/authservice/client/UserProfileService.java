package com.huongque.authservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.huongque.authservice.dto.UserProfileDto;

@FeignClient(name = "userservice",url = "http://userservice:8083/users")
public interface UserProfileService {
    @PostMapping
    void createUserProfile(@RequestBody UserProfileDto userProfileDto);

}

