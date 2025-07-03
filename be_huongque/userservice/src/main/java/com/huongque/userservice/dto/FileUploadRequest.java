package com.huongque.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileUploadRequest {
    private String fileName;
    private String fileType;
    private byte[] data;
    private String userId; // Assuming this is the ID of the user uploading the file
}
