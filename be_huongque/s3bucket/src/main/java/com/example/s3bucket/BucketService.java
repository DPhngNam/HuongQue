package com.example.s3bucket;

import java.util.UUID;

import org.springframework.stereotype.Service;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

@Service
public class BucketService {
    private final S3Client s3Client;
    private final String bucketName = System.getenv("AWS_S3_BUCKET_NAME");

    public BucketService(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public String uploadRawImage(byte[] fileBytes, String contentType) {
        if (fileBytes == null || fileBytes.length == 0) {
            throw new IllegalArgumentException("File bytes cannot be null or empty");
        }
        if (contentType == null || (!contentType.equals("image/jpeg") && !contentType.equals("image/png"))) {
            throw new IllegalArgumentException("Content type must be either image/jpeg or image/png");
        }

        String extension = contentType.equals("image/jpeg") ? ".jpg" : ".png";
        String key = UUID.randomUUID() + extension;

        try {
            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .contentType(contentType)
                    .build();

            s3Client.putObject(request, RequestBody.fromBytes(fileBytes));
            return key;
        } catch (S3Exception e) {
            throw new RuntimeException("Failed to upload image to S3: " + e.getMessage(), e);
        }
    }
}
