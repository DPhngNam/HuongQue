package com.huongque.productservice.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductJsonDTO {
    @JsonProperty("product_name")
    private String name;

    private String description;

    private String price;

    @JsonProperty("image_urls")
    private List<String> imageUrls;
    @JsonProperty("category_id")
    private String categoryId;
}
