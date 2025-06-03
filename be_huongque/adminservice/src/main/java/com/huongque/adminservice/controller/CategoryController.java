package com.huongque.adminservice.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.huongque.adminservice.model.Category;
import com.huongque.adminservice.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Category", description = "API for managing categories")
@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @Operation(summary = "Create a new category", description = "Creates a new category with the provided details.")
    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        return categoryService.createCategory(category);
    }

    @Operation(summary = "Get all categories", description = "Retrieves all categories.")
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @Operation(summary = "Get category by ID", description = "Retrieves a category by its UUID.")
    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable UUID id) {
        return categoryService.getCategoryById(id);
    }

    @Operation(summary = "Update category", description = "Updates an existing category by its UUID.")
    @PutMapping("/{id}")
    public Category updateCategory(@PathVariable UUID id, @RequestBody Category category) {
        return categoryService.updateCategory(id, category);
    }

    @Operation(summary = "Delete category", description = "Deletes a category by its UUID.")
    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable UUID id) {
        categoryService.deleteCategory(id);
    }
}
