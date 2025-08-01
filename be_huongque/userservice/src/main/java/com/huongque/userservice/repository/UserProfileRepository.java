package com.huongque.userservice.repository;

import com.huongque.userservice.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.UUID;

public interface UserProfileRepository extends JpaRepository<UserProfile, UUID> {
    UserProfile findByGmail(String gmail);
    UserProfile findByPhone(String phone);
    

}
