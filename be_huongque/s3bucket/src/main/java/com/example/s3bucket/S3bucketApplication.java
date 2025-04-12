package com.example.s3bucket;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class S3bucketApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure()
				.directory("s3bucket/.env")
				.load();
		// Set environment variables
		dotenv.entries().forEach(entry -> {
			System.out.println("Setting system property: " + entry.getKey());
			System.setProperty(entry.getKey(), entry.getValue());
		});

		SpringApplication.run(S3bucketApplication.class, args);
	}

}
