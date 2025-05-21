package com.huongque.searchservice.service;

import com.huongque.searchservice.client.ProductClient;
import com.huongque.searchservice.model.Product;
import com.huongque.searchservice.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductSearchService {

    private final ProductRepository productRepository;
    private final ProductClient productClient;

    @Autowired
    public ProductSearchService(ProductRepository productRepository, ProductClient productClient) {
        this.productRepository = productRepository;
        this.productClient = productClient;
    }

    public List<Product> searchByNameOrId(String query) {
        return productRepository.searchByNameOrId(query);
    }

    public List<Product> findByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    public Product findById(String id) {
        return productRepository.findById(id).orElse(null);
    }

    @Scheduled(cron = "${indexing.cron.expression}")
    public void syncProductData() {
        List<Product> products = productClient.getAllProducts();
        productRepository.saveAll(products);
    }

    // Method to manually trigger reindexing
    public void reindexAllProducts() {
        productRepository.deleteAll();
        syncProductData();
    }
} 