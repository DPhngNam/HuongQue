package com.huongque.authservice.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.huongque.authservice.entity.UserRole;

public interface UserRoleRepository extends JpaRepository<UserRole, UUID> {
    // Tìm kiếm vai trò của người dùng theo ID người dùng
    Optional<UserRole> findByUserId(UUID userId);

    // Kiểm tra xem người dùng có vai trò cụ thể hay không
    boolean existsByUserIdAndRoleName(UUID userId, String roleName);
    
}
