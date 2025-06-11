package com.huongque.productservice.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class ProductJsonDTO {
    @JsonProperty("name")
    private String name;

    private String description;

    private String price;

    @JsonProperty("image_urls  ")
    private List<String> imageUrls;
    @JsonProperty("category_id")
    private String categoryId;
}
