package com.huongque.productservice.repository;

import com.huongque.productservice.dto.ProductRequestDTO;
import com.huongque.productservice.dto.ProductResponseDTO;
import com.huongque.productservice.entity.Category;
import com.huongque.productservice.entity.Product;


@Mapper(componentModel = "spring")
public interface ProductMapper {

    // Map từ RequestDTO sang Entity
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "tenantId", ignore = true)
    @Mapping(target = "category", source = "category")
    Product toEntity(ProductRequestDTO dto, Category category);

    // Map từ Entity sang ResponseDTO
    @Mapping(target = "categoryId", source = "category.id")
    @Mapping(target = "categoryName", source = "category.name")
    ProductResponseDTO toDto(Product product);
}
