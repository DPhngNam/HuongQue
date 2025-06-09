package com.huongque.productservice.data;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.huongque.productservice.entity.Category;
import com.huongque.productservice.repository.CategoryRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class CategorySeeder {

    private final CategoryRepository categoryRepository;

    @PostConstruct
    public void seedCategories() {
        try {
            if (categoryRepository.count() == 0) {
                ObjectMapper objectMapper = new ObjectMapper();
                InputStream inputStream = getClass().getResourceAsStream("/ocop_quang_ninh_categories.json");

                if (inputStream == null) {
                    System.err.println("❌ Không tìm thấy file ocop_quang_ninh_categories.json trong resources!");
                    return;
                }

                List<Map<String, String>> categoryData = objectMapper.readValue(inputStream, new TypeReference<>() {});
                for (Map<String, String> item : categoryData) {
                    UUID id = UUID.fromString(item.get("category_id"));
                    String name = item.get("category_name");
                    Category category = new Category(id, name);
                    categoryRepository.save(category);
                }

                System.out.println("✅ Dữ liệu category đã được seed thành công.");
            } else {
                System.out.println("ℹ️ Bảng category đã có dữ liệu, bỏ qua bước seed.");
            }
        } catch (Exception e) {
            System.err.println("❌ Lỗi khi seed category: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
