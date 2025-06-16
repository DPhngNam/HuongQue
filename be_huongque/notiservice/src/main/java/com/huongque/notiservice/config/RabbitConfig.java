package com.huongque.notiservice.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    // Queue names
    public static final String ORDER_QUEUE = "orders";
    public static final String ORDER_EXCHANGE = "order.exchange";
    public static final String ORDER_ROUTING_KEY = "order.routing.key";

    // Payment service related constants
    public static final String PAYMENT_QUEUE = "payment.requests";
    public static final String PAYMENT_EXCHANGE = "payment.exchange";
    public static final String PAYMENT_ROUTING_KEY = "payment.routing.key";
    public static final String PAYMENT_REPLY_QUEUE = "payment.replies";

    @Bean
    public Declarables rabbitDeclarables() {
        Queue orderQueue = new Queue(ORDER_QUEUE, true); // durable
        DirectExchange orderExchange = new DirectExchange(ORDER_EXCHANGE);
        Binding orderBinding = BindingBuilder
                .bind(orderQueue)
                .to(orderExchange)
                .with(ORDER_ROUTING_KEY);

        // Payment service queues and exchange
        Queue paymentQueue = new Queue(PAYMENT_QUEUE, true);
        Queue paymentReplyQueue = new Queue(PAYMENT_REPLY_QUEUE, true);
        DirectExchange paymentExchange = new DirectExchange(PAYMENT_EXCHANGE);
        Binding paymentBinding = BindingBuilder
                .bind(paymentQueue)
                .to(paymentExchange)
                .with(PAYMENT_ROUTING_KEY);

        return new Declarables(orderQueue, orderExchange, orderBinding,
                             paymentQueue, paymentReplyQueue, paymentExchange, paymentBinding);
    }


    // Exchange for order messages
    @Bean
    public DirectExchange orderExchange() {
        return new DirectExchange(ORDER_EXCHANGE);
    }

    // Queue for order messages
    @Bean
    public Queue orderQueue() {
        return new Queue(ORDER_QUEUE, true); // durable
    }

    // Binding between queue and exchange
    @Bean
    public Binding orderBinding(Queue orderQueue, DirectExchange orderExchange) {
        return BindingBuilder
                .bind(orderQueue)
                .to(orderExchange)
                .with(ORDER_ROUTING_KEY);
    }

    // Message converter for JSON
    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    // RabbitTemplate with JSON converter
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        return rabbitTemplate;
    }
}
