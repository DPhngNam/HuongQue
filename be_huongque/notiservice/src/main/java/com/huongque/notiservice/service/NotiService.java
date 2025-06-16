package com.huongque.notiservice.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.huongque.notiservice.entities.AdminNotification;
import com.huongque.notiservice.entities.UserNotification;
import com.huongque.notiservice.repository.AdminNotiRepository;
import com.huongque.notiservice.repository.UserNotiRepository;
import com.huongque.notiservice.enums.NotificationStatus;

@Service
public class NotiService {
    @Autowired
    private UserNotiRepository userNotiRepository;
    @Autowired
    private AdminNotiRepository adminNotiRepository;

    public void createUserNotification(UserNotification userNotification) {
        userNotiRepository.save(userNotification);
        
    }

    public void createAdminNotification(AdminNotification adminNotification) {
        adminNotiRepository.save(adminNotification);
    }

    public void readNotification(UUID notificationId, boolean isAdmin) {
        if (isAdmin) {
            AdminNotification adminNotification = adminNotiRepository.findById(notificationId)
                    .orElseThrow(() -> new RuntimeException("Notification not found"));
            adminNotification.setStatus(NotificationStatus.READ);
            adminNotiRepository.save(adminNotification);
        } else {
            UserNotification userNotification = userNotiRepository.findById(notificationId)
                    .orElseThrow(() -> new RuntimeException("Notification not found"));
            userNotification.setStatus(NotificationStatus.READ);
            userNotiRepository.save(userNotification);
        }
    }
    public List<UserNotification> getUserNotifications(UUID userId) {
        return userNotiRepository.findByUserId(userId);
    }
    public List<AdminNotification> getAdminNotifications() {
        return adminNotiRepository.findAll();
    }

    public List<UserNotification> getUnreadUserNotifications(UUID userId) {
        return userNotiRepository.findByUserId(userId).stream()
                .filter(notification -> notification.getStatus() == NotificationStatus.UNREAD)
                .toList();
    }
    public List<AdminNotification> getUnreadAdminNotifications() {
        return adminNotiRepository.findAll().stream()
                .filter(notification -> notification.getStatus() == NotificationStatus.UNREAD)
                .toList();
    }
    
}
