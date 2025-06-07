package com.huongque.productservice.data;

import com.huongque.productservice.entity.Category;
import com.huongque.productservice.repository.CategoryRepository;
import java.util.List;
import java.util.UUID;
public class DataLoader {
    private static CategoryRepository categoryRepository;

    public static void loadData() {
        try {
            categoryRepository.saveAll(List.of(
                    new Category(UUID.fromString("dc951bf6-2c92-429c-828d-e6ffbbfe6d81"), "Thực phẩm - Ẩm thực"),
                    new Category(UUID.fromString("88302e50-5f2f-4346-a79a-0cba7106287a"), "Đồ Uống"),
                    new Category(UUID.fromString("65984fcc-9445-4455-9154-03b52890c186"), "Thảo Dược"),
                    new Category(UUID.fromString("9e68cf84-5604-4263-8fd3-c6f78c85308c"), "Vải và may mặc"),
                    new Category(UUID.fromString("e105a895-c9a4-4c97-937a-baca2c087307"),
                            "Nội thất - Trang trí - Lưu niệm"),
                    new Category(UUID.fromString("22c68d2b-4e0d-4c9a-aa62-8a7d3b34945b"), "Dịch vụ"),
                    new Category(UUID.fromString("93b43cac-41c2-4538-8f2b-da173a979d2b"), "Các sản phẩm khác")));

            System.out.println("Categories loaded successfully.");

        } catch (Exception e) {

            e.printStackTrace();
        }

    }
}
