package com.filmwiseapp.filwiseapi.controller;

import org.springframework.web.bind.annotation.*;

@RestController
public class HomeController {
    @GetMapping("/status")
    public String home() {
        return "servidor funcionando";
    }
}
