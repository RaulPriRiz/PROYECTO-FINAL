package com.filmwiseapp.filwiseapi.controller;

import org.springframework.web.bind.annotation.*;
import com.filmwiseapp.filwiseapi.dao.GameRepository;
import com.filmwiseapp.filwiseapi.model.Game;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "*") //permite a React llamar a la api
public class GameController {

    private final GameRepository repo;

    public GameController(GameRepository repo) {
        this.repo = repo;
    }

    @PostMapping("/newGame")
    public void createNewGame(@RequestBody Game game) {
        repo.createGame(game);
    }

    @PutMapping("/update")
    public void updateGame(@RequestBody Game game) {
        repo.updateGame(game.getUserId(),game.getFilmId(), game.getLastTime());
    }

    @PostMapping
    public Game getGame(@RequestBody Game game) {
        return repo.findGame(game.getUserId(), game.getFilmId());
    }
}
