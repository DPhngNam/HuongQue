package com.huongque.orderservice.service;

import com.huongque.orderservice.config.RabbitConfig;
import com.huongque.orderservice.dto.PaymentRequest;
import com.huongque.orderservice.dto.PaymentResponse;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class PaymentService {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    private final ConcurrentHashMap<String, CompletableFuture<PaymentResponse>> pendingRequests = new ConcurrentHashMap<>();

    public PaymentResponse requestPayment(PaymentRequest request) {
        String correlationId = request.getOrderId(); // Use orderId as correlationId
        CompletableFuture<PaymentResponse> future = new CompletableFuture<>();
        pendingRequests.put(correlationId, future);

        try {
            log.info("Sending payment request for order: {}", request.getOrderId());
            rabbitTemplate.convertAndSend(
                RabbitConfig.PAYMENT_EXCHANGE,
                RabbitConfig.PAYMENT_ROUTING_KEY,
                request,
                message -> {
                    message.getMessageProperties().setCorrelationId(correlationId);
                    message.getMessageProperties().setReplyTo(RabbitConfig.PAYMENT_REPLY_QUEUE);
                    return message;
                }
            );

            // Wait for response with timeout
            PaymentResponse response = future.get(30, TimeUnit.SECONDS);
            if (response == null) {
                throw new RuntimeException("No response received from payment service");
            }
            return response;
        } catch (Exception e) {
            log.error("Error processing payment request: {}", e.getMessage());
            pendingRequests.remove(correlationId);
            throw new RuntimeException("Payment service error: " + e.getMessage());
        }
    }

    @RabbitListener(queues = RabbitConfig.PAYMENT_REPLY_QUEUE)
    public void handlePaymentResponse(PaymentResponse response) {
        String correlationId = response.getOrderId();
        log.info("Received payment response for order: {}", correlationId);
        CompletableFuture<PaymentResponse> future = pendingRequests.remove(correlationId);
        if (future != null) {
            future.complete(response);
        } else {
            log.warn("No pending request found for order: {}", correlationId);
        }
    }
} 