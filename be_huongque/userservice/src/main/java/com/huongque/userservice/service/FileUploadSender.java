package com.huongque.userservice.service;

import com.huongque.userservice.dto.FileUploadRequest;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class FileUploadSender {

    @Value("${upload.request-queue}")
    private String requestQueue;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void send(FileUploadRequest request) {
        rabbitTemplate.convertAndSend(requestQueue, request);
    }
}

