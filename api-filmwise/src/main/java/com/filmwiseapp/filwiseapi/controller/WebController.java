package com.filmwiseapp.filwiseapi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {

    // Esta expresión regular captura rutas que NO tienen un punto (evita capturar imagenes, js, css)
    @RequestMapping(value = "/{path:[^\\.]*}")
    public String redirect() {
        // El "forward" es clave: carga el index.html sin cambiar la URL del navegador
        return "forward:/index.html";
    }
}