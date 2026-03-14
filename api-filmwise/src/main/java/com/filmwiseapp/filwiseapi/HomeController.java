package com.filmwiseapp.filwiseapi;

import org.springframework.web.bind.annotation.*;

@RestController
public class HomeController {
    @GetMapping("/")
    public String home() {
        return "servidor funcionando";
    }
}
