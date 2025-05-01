package com.huongque.productservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.web.servlet.FilterRegistrationBean;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<TennantFilter> tenantFilter() {
        FilterRegistrationBean<TennantFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new TennantFilter());
        registrationBean.addUrlPatterns("/*"); // apply cho mọi API
        registrationBean.setOrder(1); // Ưu tiên chạy sớm
        return registrationBean;
    }
}
