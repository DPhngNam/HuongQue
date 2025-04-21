package com.huongque.productservice.service;

import com.huongque.productservice.config.TenantContext;
import com.huongque.productservice.repository.CategoryRepository;
import com.huongque.productservice.entity.Product;
import com.huongque.productservice.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public List<Product> getAllProductsForTenant() {
        return productRepository.findAllByTenantId(TenantContext.getTenantId());
    }

}
