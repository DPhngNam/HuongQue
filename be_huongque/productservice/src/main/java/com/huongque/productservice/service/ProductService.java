package com.huongque.productservice.service;

import com.huongque.productservice.config.TenantContext;
import com.huongque.productservice.dto.ProductRequestDTO;
import com.huongque.productservice.dto.ProductResponseDTO;
import com.huongque.productservice.entity.Category;
import com.huongque.productservice.repository.CategoryRepository;
import com.huongque.productservice.entity.Product;
import com.huongque.productservice.repository.ProductMapper;
import com.huongque.productservice.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    public List<ProductResponseDTO> getAllProductsForTenant() {
        UUID tenantId = TenantContext.getTenantId();
        return productRepository.findAllByTenantId(tenantId)
                .stream()
                .map(productMapper::toDto)
                .collect(Collectors.toList());
    }

    public ProductResponseDTO createProduct(ProductRequestDTO productRequestDTO) {
        Category category = categoryRepository.findById(productRequestDTO.getCategoryId()).orElseThrow(()-> new RuntimeException("Category not found"));
        Product product = productMapper.toEntity(productRequestDTO, category);
        product.setTenantId(TenantContext.getTenantId());
        product.setId(UUID.randomUUID());
        product.setCreatedAt(Timestamp.from(Instant.now()));
        product.setUpdatedAt(Timestamp.from(Instant.now()));
        Product savedProduct = productRepository.save(product);
        return productMapper.toDto(savedProduct);

    }
    public Optional<ProductResponseDTO> getProductById(UUID id) {
        UUID tenantId = TenantContext.getTenantId();
        return productRepository.findByIdAndTenantId(id, tenantId)
                .map(productMapper::toDto);
    }

    public void deleteProduct(UUID id) {
        productRepository.findByIdAndTenantId(id, TenantContext.getTenantId())
                .ifPresent(productRepository::delete);
    }





}
