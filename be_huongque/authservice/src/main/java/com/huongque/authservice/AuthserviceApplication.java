package com.huongque.authservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import jakarta.annotation.PostConstruct;

@SpringBootApplication
@EnableJpaRepositories("com.huongque.authservice.repository")
@EntityScan("com.huongque.authservice.entity")
@EnableFeignClients
public class AuthserviceApplication {

	@Autowired
	private Environment env;
	
	@PostConstruct
	public void printEurekaUrl() {
		System.out.println(">>> Eureka URL = " + env.getProperty("spring.eureka.client.service-url.defaultZone"));
	}
	public static void main(String[] args) {
		SpringApplication.run(AuthserviceApplication.class, args);
	}

}
