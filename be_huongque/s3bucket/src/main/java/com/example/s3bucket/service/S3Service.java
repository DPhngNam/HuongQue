package com.example.s3bucket.service;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class S3Service {
    @Autowired
    private S3Client s3Client;

    public void uploadFile(String bucketName, String key, String filePath) {
        s3Client.putObject(PutObjectRequest.builder().bucket(bucketName).key(key).build(),
                RequestBody.fromFile(new File(filePath)));
    }

    public void upload(String bucket, String key, String contentType, byte[] content) throws IOException {
        PutObjectRequest request = PutObjectRequest.builder()
                .bucket(bucket)
                .key(key)
                .contentType(contentType)
                .build();

        s3Client.putObject(request, RequestBody.fromBytes(content));
    }

    public void downloadFile(String bucketName, String key, String filePath) {
        s3Client.getObject(GetObjectRequest.builder().bucket(bucketName).key(key).build(),
                ResponseTransformer.toFile(new File(filePath)));
    }

    public void deleteFile(String bucketName, String key) {
        s3Client.deleteObject(DeleteObjectRequest.builder().bucket(bucketName).key(key).build());
    }

    public void listFiles(String bucketName) {
        s3Client.listObjects(ListObjectsRequest.builder().bucket(bucketName).build());
    }

    public String getFileUrl(String bucket, String key) {
        return "https://<your-project>.supabase.co/storage/v1/object/public/" + bucket + "/" + key;
    }

}
