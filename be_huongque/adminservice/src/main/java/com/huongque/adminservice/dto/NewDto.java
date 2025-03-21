package com.huongque.adminservice.dto;

import java.time.ZonedDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewDto {
    private String newtitle;
    private String newcontent;
    private ZonedDateTime newcreatedat;
    private ZonedDateTime newupdatedat;
    
    public NewDto(String newtitle, String newcontent, ZonedDateTime newcreatedat, ZonedDateTime newupdatedat) {
        this.newtitle = newtitle;
        this.newcontent = newcontent;
        this.newcreatedat = newcreatedat;
        this.newupdatedat = newupdatedat;
    }
    
}
