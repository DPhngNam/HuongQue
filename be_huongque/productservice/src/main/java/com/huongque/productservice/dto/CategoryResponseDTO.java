package com.huongque.productservice.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
public class CategoryResponseDTO {
    private UUID id;
    private String name;
    private String slug;

}
