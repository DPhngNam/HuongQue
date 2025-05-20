package com.example.s3bucket.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.s3bucket.config.S3Config;



@Service
public class S3Service {
    @Autowired
    private S3Config s3Config;
    
    public String uploadFile(String bucketName, String filePath, String contentType, String base64Content) throws IOException, InterruptedException {
        return s3Config.uploadFile(bucketName, filePath, contentType, base64Content);
    }

    public String getFileUrl(String bucket, String key) {
        return s3Config.getFileUrl(bucket, key);
    }

}
