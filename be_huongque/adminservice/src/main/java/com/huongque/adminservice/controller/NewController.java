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

@RestController
@RequestMapping("/news")
@CrossOrigin(origins = "*")
public class NewController {

    @Autowired
    private NewService newService;
    @PostMapping
    public ResponseEntity<New> createNew(@RequestBody NewDto newDto) {
        try {
            New createdNew = newService.createNew(newDto);
            return new ResponseEntity<>(createdNew, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping
    public ResponseEntity<New> updateNew(@RequestBody NewDto newDto) {
        try {
            New updatedNew = newService.updateNew(newDto);
            return new ResponseEntity<>(updatedNew, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteNew(@PathVariable("id") UUID id) {
        try {
            newService.deleteNew(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping()
    public ResponseEntity<String> getAllNews() {
        return new ResponseEntity<>("Hello World", HttpStatus.OK);
    }
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
