package com.huongque.productservice.service;

import com.huongque.productservice.entity.Category;
import com.huongque.productservice.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
    public Category getCategoryById(UUID id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }
    public void deleteCategory(UUID id) {
        categoryRepository.findById(id)
                .ifPresent(categoryRepository::delete);
    }
    public Category updateCategory(UUID id, Category category) {
        Category existingCategory = getCategoryById(id);
        existingCategory.setName(category.getName());
        existingCategory.setDescription(category.getDescription());
        return categoryRepository.save(existingCategory);
    }


}
