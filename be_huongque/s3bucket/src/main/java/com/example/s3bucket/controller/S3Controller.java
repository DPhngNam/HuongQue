package com.example.s3bucket.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/s3")
public class S3Controller {

    @GetMapping("/test")
    public String test() {
        return "Hello, World!";
    }
    
}
