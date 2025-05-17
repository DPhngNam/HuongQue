package com.huongque.notiservice.service;

import org.springframework.stereotype.Service;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

@Service
public class NotiService {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Value("${notification.exchange}")
    private String exchange;

    @Value("${notification.routing-key}")
    private String routingKey;

    public void sendNotification(String message) {
        rabbitTemplate.convertAndSend(exchange, routingKey, message);
    }
}
