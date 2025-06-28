package com.huongque.userservice.mapper;

import com.huongque.userservice.dto.UserProfileDto;
import com.huongque.userservice.entity.UserProfile;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserProfileMapper {
    UserProfileMapper INSTANCE = Mappers.getMapper(UserProfileMapper.class);

    UserProfileDto toDto(UserProfile entity);

    UserProfile toEntity(UserProfileDto dto);
}

