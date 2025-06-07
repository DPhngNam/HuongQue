package com.huongque.searchservice.controller;

import com.huongque.searchservice.model.Product;
import com.huongque.searchservice.model.Tenant;
import com.huongque.searchservice.service.ProductSearchService;
import com.huongque.searchservice.service.TenantSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final ProductSearchService productSearchService;
    private final TenantSearchService tenantSearchService;

    @Autowired
    public SearchController(ProductSearchService productSearchService, TenantSearchService tenantSearchService) {
        this.productSearchService = productSearchService;
        this.tenantSearchService = tenantSearchService;
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String query) {
        return ResponseEntity.ok(productSearchService.searchByNameOrId(query));
    }

    @GetMapping("/products/by-name")
    public ResponseEntity<List<Product>> searchProductsByName(@RequestParam String name) {
        return ResponseEntity.ok(productSearchService.findByName(name));
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        Product product = productSearchService.findById(id);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(product);
    }

    @GetMapping("/tenants")
    public ResponseEntity<List<Tenant>> searchTenants() {
        return ResponseEntity.ok(tenantSearchService.findAll());
    }

    @GetMapping("/tenants/by-name")
    public ResponseEntity<List<Tenant>> searchTenantsByName(@RequestParam String name) {
        return ResponseEntity.ok(tenantSearchService.findByName(name));
    }

    @GetMapping("/tenants/{id}")
    public ResponseEntity<Tenant> getTenantById(@PathVariable String id) {
        Tenant tenant = tenantSearchService.findById(id);
        if (tenant == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(tenant);
    }

    @PostMapping("/reindex/products")
    public ResponseEntity<String> reindexProducts() {
        productSearchService.reindexAllProducts();
        return ResponseEntity.ok("Product reindexing initiated");
    }

    @PostMapping("/reindex/tenants")
    public ResponseEntity<String> reindexTenants() {
        tenantSearchService.reindexAllTenants();
        return ResponseEntity.ok("Tenant reindexing initiated");
    }
} 