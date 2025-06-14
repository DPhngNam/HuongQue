package com.huongque.productservice.data;

import com.huongque.productservice.entity.Category;
import com.huongque.productservice.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
@Order(1) // Chạy trước ProductSeeder
public class CategorySeeder implements CommandLineRunner {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
public void run(String... args) throws Exception {
    if (categoryRepository.count() == 0) {
        List<Category> categories = List.of(
            new Category(UUID.fromString("24d67553-552f-4225-9c62-b281b7a5bb19"), "Thực phẩm - Ẩm thực"),
            new Category(UUID.fromString("af62bf01-fafa-4225-9db9-ab40e724f59c"), "Đồ Uống"),
            new Category(UUID.fromString("364cf7f8-7aea-4539-bf72-bbec2aa84ea4"), "Thảo Dược"),
            new Category(UUID.fromString("2f6e9ce4-2086-48aa-a7ad-e67b087744c8"), "Vải và may mặc"),
            new Category(UUID.fromString("6316c8a9-38dd-4696-a19d-44e5b98aa368"), "Nội thất - Trang trí - Lưu niệm"),
            new Category(UUID.fromString("d67b103a-22eb-4bd1-8dcb-95acd385bf49"), "Dịch vụ"),
            new Category(UUID.fromString("5049fd36-c3a3-4a6b-b4db-c49a01935f49"), "Các sản phẩm khác")
        );

        categoryRepository.saveAll(categories);
        System.out.println("✅ Category seeding completed successfully.");
    }
}
}
