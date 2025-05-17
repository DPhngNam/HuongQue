package com.huongque.notiservice.config;
import org.springframework.amqp.core.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@Configuration
public class RabbitMQConfig {
    @Value("${notification.queue}")
    private String queue;

    @Value("${notification.exchange}")
    private String exchange;

    @Value("${notification.routing-key}")
    private String routingKey;

    @Bean
    public Queue notificationQueue() {
        return new Queue(queue, true);
    }

    @Bean
    public TopicExchange notificationExchange() {
        return new TopicExchange(exchange);
    }

    @Bean
    public Binding notificationBinding() {
        return BindingBuilder.bind(notificationQueue())
                .to(notificationExchange())
                .with(routingKey);
    }
}
