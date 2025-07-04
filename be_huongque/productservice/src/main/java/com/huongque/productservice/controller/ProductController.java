package com.huongque.productservice.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.huongque.productservice.dto.ProductRequestDTO;
import com.huongque.productservice.dto.ProductResponseDTO;
import com.huongque.productservice.service.ProductService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ProductResponseDTO> createProduct(@RequestBody @Valid ProductRequestDTO dto) {
        return ResponseEntity.ok(productService.createProduct(dto));
    }

    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProductsForTenant());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable UUID id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProductResponseDTO>> getAllProductsNoTenant() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/top")
    public ResponseEntity<List<ProductResponseDTO>> getTopProducts(@RequestParam int count) {
        return ResponseEntity.ok(productService.getTopProducts(count));
    }

    @GetMapping("/category/{categorySlug}")
    public ResponseEntity<List<ProductResponseDTO>> getAllProductsByCategorySlug(@PathVariable String categorySlug) {
        return ResponseEntity.ok(productService.getAllProductsByCategorySlug(categorySlug));
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<ProductResponseDTO>> getProductsForTenantWithPagination(
            @RequestParam int page, @RequestParam int size) {
        return ResponseEntity.ok(productService.getProductsForTenantWithPagination(page, size));
    }
    
    @PatchMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> updateProduct(@PathVariable UUID id, @RequestBody @Valid ProductRequestDTO dto) {
        return ResponseEntity.ok(productService.updateProduct(id, dto));
    }

}
