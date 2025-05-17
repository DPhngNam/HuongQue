package com.example.s3bucket.listener;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Component;

import com.example.s3bucket.model.FileUploadRequest;
import com.example.s3bucket.model.FileUploadResponse;
import com.example.s3bucket.service.S3Service;

@Component
public class S3Listener {
    @Autowired
    private S3Service s3Service;

    @RabbitListener(queues = "file.upload")
    @SendTo("file.upload.response")
    public FileUploadResponse handleFileUpload(FileUploadRequest request) {
        try {
            if (request.getBucketName() == null || request.getBucketName().trim().isEmpty()) {
                return new FileUploadResponse(false, "Bucket name is required");
            }

            s3Service.upload(
                request.getBucketName(),
                request.getFileName(),
                request.getContentType(),
                request.getFileContent()
            );

            String fileUrl = s3Service.getFileUrl(request.getBucketName(), request.getFileName());
            return new FileUploadResponse(true, fileUrl);
        } catch (Exception e) {
            return new FileUploadResponse(false, e.getMessage());
        }
    }
}

