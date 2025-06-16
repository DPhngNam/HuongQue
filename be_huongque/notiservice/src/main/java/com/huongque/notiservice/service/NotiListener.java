package com.huongque.notiservice.service;
import org.springframework.stereotype.Component;

import com.huongque.notiservice.entities.UserNotification;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
@Component
public class NotiListener {

    @Autowired
    private NotiService notiService;

    @RabbitListener(queues = "orders")
    public void receiveOrderNotification(String message) {
        // Assuming UserNotification has a constructor that accepts a String message
        UserNotification notification = new UserNotification(message);
        notiService.createUserNotification(notification);
        System.out.println("Received order notification: " + message);
    }

    @RabbitListener(queues = "payment.requests")
    public void receivePaymentRequest(String message) {
        // Process the payment request
        System.out.println("Received payment request: " + message);
    }

    @RabbitListener(queues = "payment.replies")
    public void receivePaymentReply(String message) {
        // Process the payment reply
        System.out.println("Received payment reply: " + message);
    }
  
}

