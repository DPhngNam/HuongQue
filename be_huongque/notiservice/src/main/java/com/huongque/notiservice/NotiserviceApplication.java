package com.huongque.notiservice;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableRabbit
public class NotiserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(NotiserviceApplication.class, args);
	}

}
