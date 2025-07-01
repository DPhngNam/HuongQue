package com.huongque.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileUploadRequest {
    private String bucketName;
    private String fileName;
    private String contentType;
    private String fileContent; // base64 encoded
}
