package com.huongque.userservice.service;

import com.huongque.userservice.dto.FileUploadResponse;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Component
public class UploadResponseConsumer {

    private final ConcurrentMap<String, CompletableFuture<String>> futures = new ConcurrentHashMap<>();

    public CompletableFuture<String> createFuture(String userId) {
        CompletableFuture<String> future = new CompletableFuture<>();
        futures.put(userId, future);
        return future;
    }

    @RabbitListener(queues = "${upload.response-queue}")
    public void handleResponse(FileUploadResponse response) {
        CompletableFuture<String> future = futures.remove(response.getUserId());
        if (future != null) {
            future.complete(response.getFileUrl());
        }
    }
}
