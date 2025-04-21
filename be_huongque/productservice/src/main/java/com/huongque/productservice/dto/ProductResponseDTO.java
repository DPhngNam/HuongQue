package com.huongque.productservice.dto;

import lombok.Data;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Data
public class ProductResponseDTO {
    private UUID id;
    private String name;
    private String description;
    private Double price;
    private Integer quantity;
    private List<String> images;
    private UUID categoryId;
    private String categoryName;
    private Timestamp createAt;


}

