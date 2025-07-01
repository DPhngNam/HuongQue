package com.huongque.authservice.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    private final Resend resend;

    public EmailService(@Value("${resend.api-key}") String resendApiKey) {
        this.resend = new Resend(resendApiKey);
    }

    public void sendVerificationEmail(String toEmail, String token) {
        String subject = "Verify your email";
        String message = "Click the link to verify your email: " +
                "http://localhost:8080/authservice/auth/verify-email?token=" + token;

        sendEmail(toEmail, subject, message);
    }

    public void sendPasswordResetEmail(String toEmail, String token) {
        String subject = "Reset your password";
        String message = "Click the link to reset your password: " +
                "http://localhost:8080/authservice/auth/reset-password?token=" + token;

        sendEmail(toEmail, subject, message);
    }

    private void sendEmail(String toEmail, String subject, String body) {
        CreateEmailOptions params = CreateEmailOptions.builder()
                .from("Huong Que <noreply@thinhhuynhportfolio.id.vn>")  // ✅ địa chỉ từ domain đã verify
                .to(toEmail)
                .subject(subject)
                .text(body)
                .build();

        try {
            CreateEmailResponse response = resend.emails().send(params);
            logger.info("Email sent to {} with ID: {}", toEmail, response.getId());
        } catch (ResendException e) {
            logger.error("Failed to send email to {}: {}", toEmail, e.getMessage(), e);
            throw new RuntimeException("Failed to send email", e);
        }
    }
}
