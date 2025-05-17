package com.example.s3bucket.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {
    @Bean
    public Queue fileUploadQueue() {
        return new Queue("file.upload", true);
    }

    @Bean
    public Queue fileUploadResponseQueue() {
        return new Queue("file.upload.response", true);
    }
}