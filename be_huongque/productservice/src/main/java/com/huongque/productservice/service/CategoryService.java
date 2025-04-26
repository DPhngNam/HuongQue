package com.huongque.productservice.service;

import com.huongque.productservice.dto.CategoryRequestDTO;
import com.huongque.productservice.entity.Category;
import com.huongque.productservice.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public List<Category> getAllCategories(){
        return  categoryRepository.findAll();
    }
    public Category getCategoryById(UUID id){
        return categoryRepository.findById(id)
                .orElseThrow(()->new RuntimeException("not found"));
    }
    public Category createCategory(CategoryRequestDTO dto) {
        Category category = new Category();
        category.setName(dto.getName());
        category.setDescription(dto.getDescription());
        category.setCreatedAt(Timestamp.from(Instant.now()));
        category.setUpdatedAt(Timestamp.from(Instant.now()));
        return categoryRepository.save(category);
    }

    public Category updateCategory(UUID id, CategoryRequestDTO dto) {
        Category existingCategory = getCategoryById(id);
        existingCategory.setName(dto.getName());
        existingCategory.setDescription(dto.getDescription());
        existingCategory.setUpdatedAt(Timestamp.from(Instant.now()));
        return categoryRepository.save(existingCategory);
    }

    public void deleteCategory(UUID id) {
        categoryRepository.findById(id)
                .ifPresent(categoryRepository::delete);
    }


}
