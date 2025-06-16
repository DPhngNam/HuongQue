package com.huongque.notiservice.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.huongque.notiservice.entities.AdminNotification;
import com.huongque.notiservice.entities.UserNotification;
import com.huongque.notiservice.service.NotiService;

@RestController
@RequestMapping("/api/v1/noti")
public class NotiController {   
    @Autowired
    private NotiService notiService;

    @PostMapping("/user")
    @ResponseStatus(HttpStatus.CREATED)
    public void createUserNotification(@RequestBody UserNotification userNotification) {
        notiService.createUserNotification(userNotification);
    }

    @PostMapping("/admin")
    @ResponseStatus(HttpStatus.CREATED)
    public void createAdminNotification(@RequestBody AdminNotification adminNotification) {
        notiService.createAdminNotification(adminNotification);
    }

    @PostMapping("/read")
    @ResponseStatus(HttpStatus.OK)
    public void readNotification(@RequestParam UUID notificationId, @RequestParam boolean isAdmin) {
        notiService.readNotification(notificationId, isAdmin);
    }

    @GetMapping("/user")
    public List<UserNotification> getUserNotifications(@RequestParam UUID userId) {
        return notiService.getUserNotifications(userId);
    }
    @GetMapping("/admin")
    public List<AdminNotification> getAdminNotifications() {
        return notiService.getAdminNotifications();
    }
    @GetMapping("/user/unread")
    public List<UserNotification> getUnreadUserNotifications(@RequestParam UUID userId) {
        return notiService.getUnreadUserNotifications(userId);
    }
    @GetMapping("/admin/unread")
    public List<AdminNotification> getUnreadAdminNotifications() {
        return notiService.getUnreadAdminNotifications();
    }
}
