package com.huongque.authservice.data;

import com.huongque.authservice.repository.RoleRepository;
import com.huongque.authservice.entity.Role;

import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
@Component
@RequiredArgsConstructor
public class DataLoader {
    private final RoleRepository roleRepository;

    @PostConstruct
    public void loadData() {
        System.out.println("Loading initial data...");
         if (roleRepository.count() == 0) {
            roleRepository.save(new Role( "ADMIN", "Administrator role"));
            roleRepository.save(new Role( "USER", "User role"));
            roleRepository.save(new Role( "TENANT", "Tenant role"));
        }
    }
}
