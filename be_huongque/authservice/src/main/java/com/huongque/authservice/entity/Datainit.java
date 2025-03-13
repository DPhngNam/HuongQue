package com.huongque.authservice.entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class Datainit implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User user = new User();
            user.setUsername("admin");
            user.setPasswordHash(new BCryptPasswordEncoder().encode("admin123"));
            user.setEmail("admin@example.com");
            user.setOauth2Provider(null);
            user.setOauth2Id(null);
            userRepository.save(user);
        }
    }
}
