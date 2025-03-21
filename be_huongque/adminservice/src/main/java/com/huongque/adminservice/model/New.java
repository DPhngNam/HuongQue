package com.huongque.adminservice.model;

import java.time.ZonedDateTime ;
import java.util.UUID;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class New {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID new_id;
    @Column(name = "new_title", nullable = false, length = 100)
    private String newtitle;

    @Column(name = "new_content", nullable = false)
    private String newcontent;

    @Column(name = "created_at", nullable = false)
    private ZonedDateTime  newcreatedat;

    @Column(name = "updated_at", nullable = false)
    private ZonedDateTime  newupdatedat;

    public New() {
    }

    public New(UUID new_id, String newtitle, String newcontent, ZonedDateTime newcreatedat, ZonedDateTime newupdatedat) {
        this.new_id = new_id;
        this.newtitle = newtitle;
        this.newcontent = newcontent;
        this.newcreatedat = newcreatedat;
        this.newupdatedat = newupdatedat;
    }
    
}
