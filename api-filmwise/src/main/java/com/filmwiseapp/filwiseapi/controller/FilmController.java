package com.filmwiseapp.filwiseapi.controller;

import org.springframework.web.bind.annotation.*;
import com.filmwiseapp.filwiseapi.dao.FilmRepository;
import com.filmwiseapp.filwiseapi.dto.NameRequest;
import com.filmwiseapp.filwiseapi.model.Film;
import java.util.List;

@RestController
@RequestMapping("/api/films")
@CrossOrigin(origins = "*") //permite a React llamar a la api
public class FilmController {

    private final FilmRepository repo;

    public FilmController(FilmRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Film> getFilms() {
        return repo.findAll();
    }

    //devuelve solo las pelis con fecha de máximo hace una semana
    @GetMapping("/newfilms")
    public List<Film> getUserNewFilms() {
        return repo.findNewFilms();
    }

    //hemos reutilizado nameRequest porque al fin y al cabo es un DTO que manda un string y punto y nos sirve tambien para este caso
    @PostMapping("/filmURL")
    public String getGameFilmURL(@RequestBody NameRequest nameRequest) {
        return repo.findGameFilmURL(nameRequest.getName());
    }
}
