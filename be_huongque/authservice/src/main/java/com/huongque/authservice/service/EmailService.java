package com.huongque.authservice.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    public void sendVerificationEmail(String toEmail, String token) {
        String subject = "Verify your email";
        String message = "Click the link to verify your email: " +
                "http://localhost:8081/auth/verify-email?token=" + token;

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(toEmail);
        email.setSubject(subject);
        email.setText(message);

        try {
            javaMailSender.send(email);
        } catch (Exception e) {
            logger.error("Failed to send email", e.getMessage(), e);
            throw new RuntimeException("Failed to send email", e);
        }
    }
    public void sendPasswordResetEmail(String toEmail, String token) {
        String subject = "Reset your password";
        String message = "Click the link to reset your password: " +
                "http://localhost:8081/auth/reset-password?token=" + token;
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(toEmail);
        email.setSubject(subject);
        email.setText(message);
        try {
            javaMailSender.send(email);
            logger.info("Password reset email sent to: {}", toEmail);
            

    

        } catch (Exception e) {
            logger.error("Failed to send email", e);
            throw new RuntimeException("Failed to send email", e);
        }
    }

}