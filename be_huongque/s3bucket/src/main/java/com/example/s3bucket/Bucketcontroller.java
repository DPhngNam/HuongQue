package com.example.s3bucket;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/bucket")
@CrossOrigin(origins = "*")
public class Bucketcontroller {

    private final BucketService s3Service;
    private final long maxFileSize;

    public Bucketcontroller(BucketService s3Service, @Value("${aws.s3.max-file-size:5242880}") long maxFileSize) {
        this.s3Service = s3Service;
        this.maxFileSize = maxFileSize;
    }

    @PostMapping(value = "/upload", consumes = {"image/jpeg", "image/png"})
    public ResponseEntity<?> uploadBinary(HttpServletRequest request) {
        try {
            String contentType = request.getContentType();
            long contentLength = request.getContentLengthLong();

            if (contentLength > maxFileSize) {
                return ResponseEntity.badRequest()
                    .body("File size exceeds maximum allowed size of " + maxFileSize + " bytes");
            }

            byte[] fileBytes = request.getInputStream().readAllBytes();
            String key = s3Service.uploadRawImage(fileBytes, contentType);
            return ResponseEntity.ok("Uploaded: " + key);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Failed to read file: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.internalServerError().body("Failed to upload file: " + e.getMessage());
        }
    }
}
