package com.huongque.searchservice.service;

import com.huongque.searchservice.client.TenantClient;
import com.huongque.searchservice.model.Tenant;
import com.huongque.searchservice.repository.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TenantSearchService {

    private final TenantRepository tenantRepository;
    private final TenantClient tenantClient;

    @Autowired
    public TenantSearchService(TenantRepository tenantRepository, TenantClient tenantClient) {
        this.tenantRepository = tenantRepository;
        this.tenantClient = tenantClient;
    }

    public List<Tenant> findAll() {
        return (List<Tenant>) tenantRepository.findAll();
    }

    public List<Tenant> searchByNameOrId(String query) {
        return tenantRepository.searchByNameOrId(query);
    }

    public List<Tenant> findByName(String name) {
        return tenantRepository.findByNameContainingIgnoreCase(name);
    }

    public Tenant findById(String id) {
        return tenantRepository.findById(id).orElse(null);
    }

    @Scheduled(cron = "${indexing.cron.expression}")
    public void syncTenantData() {
        List<Tenant> tenants = tenantClient.getAllTenants();
        tenantRepository.saveAll(tenants);
    }

    // Method to manually trigger reindexing
    public void reindexAllTenants() {
        tenantRepository.deleteAll();
        syncTenantData();
    }
} 