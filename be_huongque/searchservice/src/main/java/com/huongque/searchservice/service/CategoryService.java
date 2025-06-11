package com.huongque.searchservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.huongque.searchservice.model.Category;
import com.huongque.searchservice.repository.CategoryRepository;
@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    public List<Category> searchByNameOrId(String query) {
        return categoryRepository.searchByNameOrId(query);
    }
    public List<Category> findByNameContainingIgnoreCase(String name) {
        return categoryRepository.findByNameContainingIgnoreCase(name);
    }
    public List<Category> findByName(String name) {
        return categoryRepository.findByName(name);
    }
    public Optional<Category> findById(String id) {
        return categoryRepository.findById(id);
    }
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }
    
}
