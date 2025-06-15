package com.huongque.productservice.dto;

import lombok.Data;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Data
public class ProductResponseDTO {
    private UUID id;
    private String name;
    private Double price;
    private List<String> images;
    private UUID categoryId;
    private String categoryName;
    private Timestamp createAt;
}

