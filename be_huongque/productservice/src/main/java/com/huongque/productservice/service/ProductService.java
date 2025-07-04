package com.huongque.productservice.service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.huongque.productservice.config.TenantContext;
import com.huongque.productservice.dto.ProductRequestDTO;
import com.huongque.productservice.dto.ProductResponseDTO;
import com.huongque.productservice.entity.Category;
import com.huongque.productservice.entity.Product;
import com.huongque.productservice.repository.CategoryRepository;
import com.huongque.productservice.repository.ProductMapper;
import com.huongque.productservice.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

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
        product.setCreatedAt(Timestamp.from(Instant.now()));
        product.setUpdatedAt(Timestamp.from(Instant.now()));
        Product savedProduct = productRepository.save(product);
        return productMapper.toDto(savedProduct);

    }
    public Optional<ProductResponseDTO> getProductById(UUID id) {
        return productRepository.findById(id)
                .map(productMapper::toDto);
    }

    public void deleteProduct(UUID id) {
        productRepository.findByIdAndTenantId(id, TenantContext.getTenantId())
                .ifPresent(productRepository::delete);
    }
    
    public List<ProductResponseDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(productMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<ProductResponseDTO> getTopProducts(int top) {
        List<Product> allProducts = productRepository.findAll();
        Collections.shuffle(allProducts);
        return allProducts.stream()
                .limit(top)
                .map(productMapper::toDto)
                .collect(Collectors.toList());
    }
    
    public List<ProductResponseDTO> getAllProductsByCategorySlug(String categorySlug) {
        return productRepository.findByCategorySlug(categorySlug)
                .stream()
                .map(productMapper::toDto)
                .collect(Collectors.toList());
    }
    
    public Page<ProductResponseDTO> getProductsForTenantWithPagination(int page, int size) {
        UUID tenantId = TenantContext.getTenantId();
        PageRequest pageRequest = PageRequest.of(page, size);
        return productRepository.findAllByTenantId(tenantId, pageRequest)
                .map(productMapper::toDto);
    }
    
    public ProductResponseDTO updateProduct(UUID id, ProductRequestDTO dto) {
        UUID tenantId = TenantContext.getTenantId();
        Product product = productRepository.findByIdAndTenantId(id, tenantId)
            .orElseThrow(() -> new RuntimeException("Product not found or not belong to tenant"));
        if (dto.getName() != null) product.setName(dto.getName());
        if (dto.getDescription() != null) product.setDescription(dto.getDescription());
        if (dto.getPrice() != null) product.setPrice(dto.getPrice());
        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCategory(category);
        }
        product.setUpdatedAt(Timestamp.from(Instant.now()));
        Product saved = productRepository.save(product);
        return productMapper.toDto(saved);
    }
}
