package com.huongque.productservice.repository;

import com.huongque.productservice.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {
    List<Product> findAllByTenantId(UUID tenantId);

    Optional<Product> findByIdAndTenantId(UUID Id, UUID tenantId);

}
