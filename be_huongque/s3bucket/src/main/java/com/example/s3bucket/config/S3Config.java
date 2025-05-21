package com.example.s3bucket.config;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class S3Config {

    @Value("${ENDPOINT}")
    private String supabaseUrl;
    @Value("${API_KEY}")
    private String supabaseApiKey;

    public String uploadFile(String bucketName, String fileName, String contentType, String base64Content)
            throws IOException, InterruptedException {

        String endpoint = supabaseUrl + "/storage/v1/object/" + bucketName + "/" + fileName;

        URL url = new URL(endpoint);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setDoOutput(true);
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Authorization", "Bearer " + supabaseApiKey);
        conn.setRequestProperty("Content-Type", contentType);
        conn.setRequestProperty("x-upsert", "true");

        // ✅ Decode base64 to binary
        byte[] fileBytes = Base64.getDecoder().decode(base64Content);

        try (OutputStream os = conn.getOutputStream()) {
            os.write(fileBytes); 
            os.flush();
        }

        int responseCode = conn.getResponseCode();
        InputStream responseStream = responseCode >= 400 ? conn.getErrorStream() : conn.getInputStream();

        String response = new BufferedReader(new InputStreamReader(responseStream))
                .lines()
                .reduce("", (acc, line) -> acc + line + "\n");

        System.out.println("Response Code: " + responseCode);
        System.out.println("Response Body: " + response);
        return response;
    }

    public String getFileUrl(String bucket, String key) {
        return supabaseUrl + "/storage/v1/object/public/" + bucket + "/" + key;
    }

}
