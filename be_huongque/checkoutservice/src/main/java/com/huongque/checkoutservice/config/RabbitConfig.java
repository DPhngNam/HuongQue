package com.huongque.checkoutservice.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.core.Queue;

@Configuration
public class RabbitConfig {

    @Bean
    public TopicExchange orderExchange() {
        return new TopicExchange("order.exchange");
    }

    @Bean
    public Queue orderPaidQueue() {
        return new Queue("order.paid.queue");
    }

    @Bean
    public Binding binding() {
        return BindingBuilder
                .bind(orderPaidQueue())
                .to(orderExchange())
                .with("order.paid");
    }

}
