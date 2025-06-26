package com.huongque.authservice.repository;

import com.huongque.authservice.entity.EmailVerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EmailVerificationTokenRepository extends JpaRepository<EmailVerificationToken, Long> {
    Optional<EmailVerificationToken> findByToken(String token);

    Optional<EmailVerificationToken> findByUserId(UUID userId);

    void deleteByUserId(UUID userId);

    List<EmailVerificationToken> findAllByExpirationTimeBefore(Date date);
}
