package com.huongque.checkoutservice.service;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.huongque.checkoutservice.config.RabbitConfig;
import com.huongque.checkoutservice.dto.PaymentRequest;
import com.huongque.checkoutservice.dto.PaymentResponse;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class OrderListener {
    @Autowired
    private StripeService stripeService;
    
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @RabbitListener(queues = RabbitConfig.PAYMENT_QUEUE)
    public void handlePaymentRequest(PaymentRequest request) {
        log.info("Received payment request for order: {}", request.getOrderId());

        try {
            String paymentLink = stripeService.createCheckoutSession(
                Long.parseLong(request.getAmount()),
                request.getCurrency(),
                "http://localhost:8089/swagger-ui.html",
                "http://localhost:8089/swagger-ui.html"
            );

            // Create payment response
            PaymentResponse response = new PaymentResponse(
                request.getOrderId(),
                paymentLink,
                "SUCCESS"
            );

            // Send response back to the reply queue
            rabbitTemplate.convertAndSend(
                RabbitConfig.PAYMENT_REPLY_QUEUE,
                response
            );

            log.info("Payment response sent for order: {}", request.getOrderId());

            
            
        } catch (Exception e) {
            log.error("Failed to create Stripe session for order: {}", request.getOrderId(), e);
            
            // Send error response
            PaymentResponse errorResponse = new PaymentResponse(
                request.getOrderId(),
                null,
                "ERROR: " + e.getMessage()
            );
            
            rabbitTemplate.convertAndSend(
                RabbitConfig.PAYMENT_REPLY_QUEUE,
                errorResponse
            );
        }
    }
}
