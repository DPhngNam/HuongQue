package com.huongque.adminservice.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    
    @Value("${server.port}")
    private String serverPort;
    
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Huong Que Admin Service API")
                        .version("1.0.0")
                        .description("API documentation for Huong Que Admin Service. This service provides endpoints for managing news and categories.")
                        .contact(new Contact()
                                .name("Huong Que Team")
                                .email("contact@huongque.com")
                                .url("https://huongque.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0.html")))
                .addServersItem(new Server()
                        .url("http://localhost:" + serverPort)
                        .description("Development server"))
                .components(new Components()
                        .addSecuritySchemes("bearer-key", 
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")));
    }
} 