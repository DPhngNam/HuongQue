package com.huongque.productservice.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

public class TennantFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String tenantIdHeader = request.getHeader("X-Tenant-ID");
        if(tenantIdHeader != null){
            TenantContext.setTenantId(UUID.fromString(tenantIdHeader));

        }
        try {
            filterChain.doFilter(request, response);
        } finally {
            TenantContext.clear();
        }


    }
}
