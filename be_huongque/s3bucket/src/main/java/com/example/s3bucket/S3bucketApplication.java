package com.example.s3bucket;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class S3bucketApplication {
	
	@Bean
    public Dotenv dotenv() {
        return Dotenv.configure()
                .directory("s3bucket/.env") // Adjust if needed
                .load();
    }

	public static void main(String[] args) {

		SpringApplication.run(S3bucketApplication.class, args);
	}

}
