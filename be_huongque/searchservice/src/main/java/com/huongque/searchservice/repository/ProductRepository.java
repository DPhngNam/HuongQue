package com.huongque.searchservice.repository;

import com.huongque.searchservice.model.Product;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends ElasticsearchRepository<Product, String> {

    List<Product> findByNameContainingIgnoreCase(String name);

    @Query("{\"bool\": {\"should\": [{\"match\": {\"name\": \"?0\"}}, {\"match\": {\"id\": \"?0\"}}]}}")
    List<Product> searchByNameOrId(String query);
} 