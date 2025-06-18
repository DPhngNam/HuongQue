package com.huongque.productservice.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.huongque.productservice.dto.ProductJsonDTO;
import com.huongque.productservice.entity.Category;
import com.huongque.productservice.entity.Product;
import com.huongque.productservice.repository.CategoryRepository;
import com.huongque.productservice.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImportService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public void importProductsFromJson(String jsonFilePath) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        InputStream inputStream = getClass().getResourceAsStream(jsonFilePath);
        if (inputStream == null) {
            throw new IOException("File not found: " + jsonFilePath);
        }
        if (productRepository.count() > 0) {
        System.out.println("✅ Products already exist, skipping seeding.");
        return;
    }
        JsonNode root = objectMapper.readTree(inputStream);
        for (JsonNode groupNode : root) {
            JsonNode productsNode = groupNode.get("products");
            if (productsNode == null || !productsNode.isArray()) {
                throw new IOException("Invalid JSON structure: 'products' node is missing or not an array.");
            }
            for (JsonNode productNode : productsNode) {
                ProductJsonDTO productJsonDTO = objectMapper.treeToValue(productNode, ProductJsonDTO.class);
                Product product = new Product();
                product.setName(productJsonDTO.getName());

                String cleanedPrice = productJsonDTO.getPrice().replaceAll("[^\\d.]", "").replace(".", "");
                product.setPrice(cleanedPrice.isEmpty() ? 0.0 : Double.parseDouble(cleanedPrice));
                product.setImages(productJsonDTO.getImageUrls());

                java.util.UUID categoryId = java.util.UUID.fromString(productJsonDTO.getCategoryId());
                Category category = categoryRepository.findById(categoryId)
                        .orElseThrow(() -> new IOException("Category not found with ID: " + categoryId));
                product.setCategory(category);
                UUID tenantId = java.util.UUID.fromString(productJsonDTO.getTenant_id());
                product.setTenantId(tenantId);
                product.setDescription(productJsonDTO.getDescription());


                productRepository.save(product);
            }
        }
        System.out.println("✅ Products imported successfully from " + jsonFilePath);
    }
}