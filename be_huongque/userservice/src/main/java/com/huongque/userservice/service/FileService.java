package com.huongque.userservice.service;

import com.huongque.userservice.dto.FileUploadRequest;
import com.huongque.userservice.dto.FileUploadResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class FileService {

    private final RabbitTemplate rabbitTemplate;

    @Value("${spring.rabbitmq.upload.queue}")
    private String uploadQueue;

    @Value("${spring.rabbitmq.upload.response.queue}")
    private String uploadResponseQueue;

    public CompletableFuture<String> uploadAvatar(MultipartFile file, UUID userId) throws IOException {
        // Validate file
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        // Check file size (e.g., max 5MB)
        if (file.getSize() > 5 * 1024 * 1024) {
            throw new IllegalArgumentException("File size exceeds 5MB limit");
        }

        // Check file type
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Only image files are allowed");
        }

        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename != null ? 
            originalFilename.substring(originalFilename.lastIndexOf(".")) : ".jpg";
        String fileName = "avatars/" + userId + "/" + UUID.randomUUID() + extension;

        // Convert file to base64
        String base64Content = Base64.getEncoder().encodeToString(file.getBytes());

        // Create upload request
        FileUploadRequest uploadRequest = new FileUploadRequest(
            "huongque", // bucket name
            fileName,
            contentType,
            base64Content
        );

        // Wrap request in envelope format that S3Listener expects
        Map<String, Object> envelope = new HashMap<>();
        envelope.put("data", uploadRequest);

        // Send to RabbitMQ
        rabbitTemplate.convertAndSend(uploadQueue, envelope);

        // Return CompletableFuture for async processing
        // Note: In a real implementation, you might want to use correlation ID
        // to track the response from S3 service
        return CompletableFuture.completedFuture("https://your-s3-bucket-url/" + fileName);
    }

    public String uploadFile(MultipartFile file, String folderPath) throws IOException {
        // Validate file
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename != null ? 
            originalFilename.substring(originalFilename.lastIndexOf(".")) : "";
        String fileName = folderPath + "/" + UUID.randomUUID() + extension;

        // Convert file to base64
        String base64Content = Base64.getEncoder().encodeToString(file.getBytes());

        // Create upload request
        FileUploadRequest uploadRequest = new FileUploadRequest(
            "huongque",
            fileName,
            file.getContentType(),
            base64Content
        );

        // Wrap request in envelope format
        Map<String, Object> envelope = new HashMap<>();
        envelope.put("data", uploadRequest);

        // Send to RabbitMQ
        rabbitTemplate.convertAndSend(uploadQueue, envelope);

        // Return expected URL (in real implementation, wait for response)
        return "https://your-s3-bucket-url/" + fileName;
    }
}
