package com.huongque.productservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class ProductRequestDTO {

    @NotBlank
    private String name;
    private String description;

    @NotNull
    private Double price;

    @NotNull
    private Integer quantity;

    private List<String> image;

    @NotNull
    private UUID categoryId;

}
