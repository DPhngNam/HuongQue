package com.huongque.adminservice.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.huongque.adminservice.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {
    
}
