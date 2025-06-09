package com.huongque.searchservice.client;

import com.huongque.searchservice.model.Tenant;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "tenantservice", url = "${tenant.service.url}")
public interface TenantClient {

    @GetMapping("/api/tenants")
    List<Tenant> getAllTenants();

    @GetMapping("/api/tenants/{id}")
    Tenant getTenantById(@PathVariable("id") String id);
}