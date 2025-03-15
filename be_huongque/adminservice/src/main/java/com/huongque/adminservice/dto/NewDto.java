package com.huongque.adminservice.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewDto {
    private String title;
    private String content;
    private String image[];
    private LocalDateTime created_at;
    private LocalDateTime updated_at;

    public NewDto(String title, String content, String[] image, LocalDateTime created_at, LocalDateTime updated_at) {
        this.title = title;
        this.content = content;
        this.image = image;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
