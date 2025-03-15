package com.huongque.adminservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;
import com.huongque.adminservice.model.New;
import com.huongque.adminservice.dto.NewDto;
import com.huongque.adminservice.exception.ResourceNotFoundException;
import com.huongque.adminservice.service.NewService;
import java.util.List;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/news")
public class NewController {
    @Autowired
    private NewService newService;
    
    @GetMapping
    // public List<New> getAllNews() {
    //     return newService.getAllNews();
    // }
    public ResponseEntity<String> getAllNews() {
        return ResponseEntity.ok("News content");
    }
    @GetMapping("/news/{new_id}")
    public New getNewById(@PathVariable String new_id) {
        New newsItem = newService.getNewById(new_id);
        if (newsItem == null) {
            throw new ResourceNotFoundException("New not found with id: " + new_id);
        }
        return newsItem;
    }
    
    @PostMapping("/news")
    public void addNew(@RequestBody NewDto newDto) {
        newService.addNew(newDto);
    }
    
    @PutMapping("/news/{new_id}")
    public void updateNew(@PathVariable String new_id, @RequestBody NewDto newDto) {
        newService.updateNew(new_id, newDto);
    }
    
    @DeleteMapping("/news/{new_id}")
    public void deleteNew(@PathVariable String new_id) {
        newService.deleteNew(new_id);
    }
    
    @GetMapping("/news/search")
    public List<New> searchNews(@RequestParam String title) {
        return newService.searchNews(title);
    }
    
    @GetMapping("/news/search-by-date")
    public List<New> searchNewsByDate(@RequestParam LocalDateTime from, @RequestParam LocalDateTime to) {
        return newService.searchNewsByDate(from, to);
    }
    
    @GetMapping("/news/search-by-content")
    public List<New> searchNewsByContent(@RequestParam String content) {
        return newService.searchNewsByContent(content);
    }
    
    @GetMapping("/news/search-by-title-and-content")
    public List<New> searchNewsByTitleAndContent(@RequestParam String title, @RequestParam String content) {
        return newService.searchNewsByTitleAndContent(title, content);
    }
    
    // @GetMapping("/news/search-by-title-or-content")
    // public List<New> searchNewsByTitleOrContent(@RequestParam String title, @RequestParam String content) {
    //     return newService.searchNewsByTitleOrContent(title, content);
    // }
    
    // @GetMapping("/news/search-by-title-and-content-and-date")
    // public List<New> searchNewsByTitleAndContentAndDate(@RequestParam String title, @RequestParam String content, @RequestParam LocalDateTime from, @RequestParam LocalDateTime to) {
    //     return newService.searchNewsByTitleAndContentAndDate(title, content, from, to);
    // }
}