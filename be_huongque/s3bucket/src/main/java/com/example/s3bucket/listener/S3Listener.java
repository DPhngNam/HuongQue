package com.example.s3bucket.listener;

import java.util.Map;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.example.s3bucket.model.FileUploadRequest;
import com.example.s3bucket.model.FileUploadResponse;
import com.example.s3bucket.service.S3Service;
import com.fasterxml.jackson.databind.ObjectMapper;
@Component
public class S3Listener {
    @Autowired
    private S3Service s3Service;

    @RabbitListener(queues = "file.upload")
    public FileUploadResponse handleRawMessage(Map<String, Object> envelope) {
        try {

            Object data = envelope.get("data");
            ObjectMapper objectMapper = new ObjectMapper();
            FileUploadRequest request = objectMapper.convertValue(data, FileUploadRequest.class);

            
            s3Service.uploadFile(
                    request.getBucketName(),
                    request.getFileName(),
                    request.getContentType(),
                    request.getFileContent()
            );

            // Generate file URL
            String fileUrl = s3Service.getFileUrl(request.getBucketName(), request.getFileName());
            return new FileUploadResponse(true, fileUrl);

        } catch (Exception e) {
            e.printStackTrace();
            return new FileUploadResponse(false, e.getMessage());
        }
    }

    
}
