package com.huongque.productservice.data;

import com.huongque.productservice.entity.Category;
import com.huongque.productservice.repository.CategoryRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class CategorySeeder {

    private final CategoryRepository categoryRepository;

    @PostConstruct
    public void seedCategories() {
        try {
            if (categoryRepository.count() == 0) {
                List<Category> categories = List.of(
                    new Category("Thực phẩm - Ẩm thực"),
                    new Category("Đồ Uống"),
                    new Category("Thảo Dược"),
                    new Category("Vải và may mặc"),
                    new Category("Nội thất - Trang trí - Lưu niệm"),
                    new Category("Dịch vụ"),
                    new Category("Các sản phẩm khác")
                );

                categoryRepository.saveAll(categories);
                System.out.println("✅ Dữ liệu category đã được seed thành công.");
            } else {
                System.out.println("ℹ️ Bảng category đã có dữ liệu, bỏ qua bước seed.");
            }
        } catch (Exception e) {
            System.err.println("❌ Lỗi khi seed category chay boi seeder:  " + e.getMessage());
            e.printStackTrace();
        }
    }
}
