package com.huongque.productservice.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.huongque.productservice.service.ImportService;

@Component
public class ProductSeeder implements CommandLineRunner{
    @Autowired
    private ImportService importService;
    @Override
    public void run(String... args) throws Exception {
        importService.importProductsFromJson("/products.json");
        System.out.println("✅ Product seeding completed successfully.");
    }
}
