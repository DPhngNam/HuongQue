package com.huongque.productservice.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import com.huongque.productservice.service.ImportService;

public class ProductSeeder implements CommandLineRunner{
    @Autowired
    private ImportService importService;
    @Override
    public void run(String... args) throws Exception {
        importService.importProductsFromJson("/products.json");
    }
}
