package com.huongque.userservice.repository;

import com.huongque.userservice.entity.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface UserAddressRepository extends JpaRepository<UserAddress, UUID> {
    List<UserAddress> findByUserProfileId(UUID userProfileId);
}
