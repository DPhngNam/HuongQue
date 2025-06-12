package com.huongque.checkoutservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;

@SpringBootApplication
@EnableRabbit
public class CheckoutserviceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CheckoutserviceApplication.class, args);
	}

}
