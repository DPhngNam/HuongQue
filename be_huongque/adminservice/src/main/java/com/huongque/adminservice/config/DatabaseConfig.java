package com.huongque.adminservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import javax.sql.DataSource;
import com.zaxxer.hikari.HikariDataSource;

@Configuration
public class DatabaseConfig {
    
    @Bean
    public DataSource getDataSource() {
        String jdbcUrl = System.getProperty("SUPABASE_JDBC_URL");
        String username = System.getProperty("SUPABASE_DB_USER");
        String password = System.getProperty("SUPABASE_DB_PASSWORD");

        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setDriverClassName("org.postgresql.Driver");
        dataSource.setJdbcUrl(jdbcUrl);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        
        // Supabase specific settings
        dataSource.addDataSourceProperty("sslmode", "require");
        dataSource.addDataSourceProperty("prepareThreshold", "0");
        
        return dataSource;
    }
} 