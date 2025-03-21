package com.huongque.adminservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class AdminserviceApplication {

	public static void main(String[] args) {
		// Load .env file first
		Dotenv dotenv = Dotenv.configure()
				.directory("be_huongque/adminservice")
				.ignoreIfMissing()
				.load();

		// Set environment variables
		dotenv.entries().forEach(entry -> {
			System.out.println("Setting system property: " + entry.getKey());
			System.setProperty(entry.getKey(), entry.getValue());
		});

		SpringApplication.run(AdminserviceApplication.class, args);
	}

}
