package com.huongque.notiservice.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/noti")
public class NotiController {

    @PostMapping("/send")
    public String sendNotification(@RequestBody String message) {
        return "Notification sent: " + message;
    }
}
