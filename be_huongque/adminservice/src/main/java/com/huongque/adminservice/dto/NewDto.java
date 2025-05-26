package com.huongque.adminservice.dto;

import java.time.ZonedDateTime;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@Schema(description = "Data Transfer Object for News items")
public class NewDto {
    @Schema(description = "Title of the news item", example = "Latest Announcement", required = true)
    private String newtitle;
    
    @Schema(description = "Content of the news item", example = "This is the full content of the news article...", required = true)
    private String newcontent;
    
    @Schema(description = "Creation date and time of the news item", format = "date-time")
    private ZonedDateTime newcreatedat;
    
    @Schema(description = "Last update date and time of the news item", format = "date-time")
    private ZonedDateTime newupdatedat;
    
    public NewDto(String newtitle, String newcontent, ZonedDateTime newcreatedat, ZonedDateTime newupdatedat) {
        this.newtitle = newtitle;
        this.newcontent = newcontent;
        this.newcreatedat = newcreatedat;
        this.newupdatedat = newupdatedat;
    }
    
}
