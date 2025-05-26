package com.huongque.adminservice.model;

import java.time.ZonedDateTime ;
import java.util.UUID;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import io.swagger.v3.oas.annotations.media.Schema;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "News entity representing a news item in the database")
@Table(name = "news")
public class New {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Schema(description = "Unique identifier for the news item", accessMode = Schema.AccessMode.READ_ONLY)
    private UUID new_id;
    
    @Column(name = "new_title", nullable = false, length = 100)
    @Schema(description = "Title of the news item", example = "Latest Announcement", required = true, maxLength = 100)
    private String newtitle;

    @Column(name = "new_content", nullable = false)
    @Schema(description = "Content of the news item", example = "This is the full content of the news article...", required = true)
    private String newcontent;

    @Column(name = "created_at", nullable = false)
    @Schema(description = "Creation date and time of the news item", format = "date-time")
    private ZonedDateTime newcreatedat;

    @Column(name = "updated_at", nullable = false)
    @Schema(description = "Last update date and time of the news item", format = "date-time")
    private ZonedDateTime newupdatedat;
    
}
