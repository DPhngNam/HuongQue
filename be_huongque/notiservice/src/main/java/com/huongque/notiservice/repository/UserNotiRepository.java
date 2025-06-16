package com.huongque.notiservice.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.huongque.notiservice.entities.UserNotification;


@Repository
public interface UserNotiRepository extends JpaRepository<UserNotification, UUID> {
    Optional<UserNotification> findById(UUID notificationId);

    List<UserNotification> findByUserId(UUID userId);
    
}
