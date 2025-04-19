package com.huongque.authservice.client;

import com.huongque.authservice.dto.UserProfileDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "user-service",url = "http://localhost:8085/users")
public interface UserProfileService {
    @PostMapping
    void createUserProfile(@RequestBody UserProfileDto userProfileDto);

}
