package com.huongque.searchservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import com.huongque.searchservice.model.Category;    
@Repository
public interface CategoryRepository extends ElasticsearchRepository<Category, String>{
    List<Category> findByNameContainingIgnoreCase(String name);

    @Query("{\"bool\": {\"should\": [{\"match\": {\"name\": \"?0\"}}, {\"match\": {\"id\": \"?0\"}}]}}")
    List<Category> searchByNameOrId(String query);
    List<Category> findByName(String name);
    
    Optional<Category> findById(String id);
    List<Category> findAll();   
    @Query("{\"match_all\": {}}")
    List<Category> getAllCategory();

    
}