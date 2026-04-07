package com.carolmedici.helpdesk.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/private")
    public String privateEndpoint() {
        return "Private endpoint!";
    }

    @GetMapping("/public")
    public String publicEndpoint() {
        return "API is running!";
    }
}
