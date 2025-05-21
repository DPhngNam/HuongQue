package com.huongque.checkoutservice.controller;

import com.huongque.checkoutservice.dto.OrderPaidEvent;
import com.huongque.checkoutservice.service.StripeService;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    @Autowired
    private StripeService stripeService;   
    private final AmqpTemplate amqpTemplate;

    public CheckoutController(AmqpTemplate amqpTemplate) {
        this.amqpTemplate = amqpTemplate;
    }
    
    @PostMapping("/payment-success")
    public ResponseEntity<String> paymentSuccess(@RequestBody OrderPaidEvent event) {
        amqpTemplate.convertAndSend("order.exchange", "order.paid", event);
        return ResponseEntity.ok("Payment confirmed and event published.");
    }

    @GetMapping("/cancel")
    public ResponseEntity<String> paymentCancel(@RequestBody OrderPaidEvent event) {
        amqpTemplate.convertAndSend("order.exchange", "order.cancelled", event);
        return ResponseEntity.ok("Payment cancelled and event published.");
    }

    @PostMapping("/create-payment-link")
    public String createPaymentLink(@RequestParam Long amount,
                                    @RequestParam(defaultValue = "usd") String currency,
                                    @RequestParam String successUrl,
                                    @RequestParam String cancelUrl) {
        try {
            String paymentLink = stripeService.createCheckoutSession(amount, currency, successUrl, cancelUrl);
            amqpTemplate.convertAndSend("payment-link", paymentLink);
            return paymentLink;
        } catch (Exception e) {
            throw new RuntimeException("Failed to create Stripe session", e);
        }
    }
} 
