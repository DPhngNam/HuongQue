package com.example.s3bucket;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class S3Config {

    @Bean
    public S3Client s3Client(Dotenv dotenv) {
        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(
            dotenv.get("AWS_ACCESS_KEY_ID"),
            dotenv.get("AWS_SECRET_ACCESS_KEY")
        );

        return S3Client.builder()
                .region(Region.of("us-east-1"))
                .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
                .build();
    }
}

