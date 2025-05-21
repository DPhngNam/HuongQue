package com.huongque.searchservice.repository;

import com.huongque.searchservice.model.Tenant;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TenantRepository extends ElasticsearchRepository<Tenant, String> {

    List<Tenant> findByNameContainingIgnoreCase(String name);

    @Query("{\"bool\": {\"should\": [{\"match\": {\"name\": \"?0\"}}, {\"match\": {\"id\": \"?0\"}}]}}")
    List<Tenant> searchByNameOrId(String query);
} 