package com.huongque.adminservice.controller;

import java.time.ZonedDateTime;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.huongque.adminservice.dto.NewDto;
import com.huongque.adminservice.model.New;
import com.huongque.adminservice.service.NewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

@Tag(name = "News", description = "API for managing news items")
@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "*")
public class NewController {

    @Autowired
    private NewService newService;
    @Operation(summary = "Create a new news item", description = "Creates a new news item with the provided details.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "News item created successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = New.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input data", content = @Content),
        @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content)
    })
    @PostMapping
    public ResponseEntity<New> createNew(@RequestBody NewDto newDto) {
        try {
            New createdNew = newService.createNew(newDto);
            return new ResponseEntity<>(createdNew, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Operation(summary = "Update a news item", description = "Updates an existing news item with the provided details.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "News item updated successfully",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = New.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input data", content = @Content),
        @ApiResponse(responseCode = "404", description = "News item not found", content = @Content),
        @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content)
    })
    @PutMapping
    public ResponseEntity<New> updateNew(@RequestBody NewDto newDto) {
        try {
            New updatedNew = newService.updateNew(newDto);
            return new ResponseEntity<>(updatedNew, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "Delete a news item", description = "Deletes a news item by its UUID.")
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteNew(@PathVariable("id") UUID id) {
        try {
            newService.deleteNew(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Operation(summary = "Get all news", description = "Retrieves all news items.")
    @GetMapping()
    public ResponseEntity<String> getAllNews() {
        return new ResponseEntity<>("Hello World", HttpStatus.OK);
    }
    @Operation(summary = "Get news by title", description = "Retrieves a news item by its title.")
    @GetMapping("/title/{title}")
    public ResponseEntity<New> getNewByTitle(@PathVariable("title") String title) {
        try {
            New news = newService.getNewByNewtitle(title);
            if (news != null) {
                return new ResponseEntity<>(news, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    @Operation(summary = "Get news by ID", description = "Retrieves a news item by its UUID.")
    @GetMapping("/{id}")
    public ResponseEntity<New> getNewById(@PathVariable("id") UUID id) {
        try {
            New news = newService.getNewByNew_id(id);
            if (news != null) {
                return new ResponseEntity<>(news, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Operation(summary = "Patch update news", description = "Updates a specific field of a news item by its UUID.")
    @PatchMapping("/{id}/{field}")
    public ResponseEntity<New> patchUpdateNew(
            @PathVariable("id") UUID id,
            @PathVariable("field") String field,
            @RequestBody Object value) {
        try {
            New patchedNew = newService.patchUpdateNew(id, field, value);
            return new ResponseEntity<>(patchedNew, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Operation(summary = "Get news by created date", description = "Retrieves a news item by its creation date.")
    @GetMapping("/created/{createdAt}")
    public ResponseEntity<New> getNewByCreatedAt(@PathVariable("createdAt") ZonedDateTime createdAt) {
        try {
            New news = newService.getNewByNewcreatedat(createdAt);
            if (news != null) {
                return new ResponseEntity<>(news, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Operation(summary = "Get news by updated date", description = "Retrieves a news item by its last update date.")
    @GetMapping("/updated/{updatedAt}")
    public ResponseEntity<New> getNewByUpdatedAt(@PathVariable("updatedAt") ZonedDateTime updatedAt) {
        try {
            New news = newService.getNewByNewupdatedat(updatedAt);
            if (news != null) {
                return new ResponseEntity<>(news, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
