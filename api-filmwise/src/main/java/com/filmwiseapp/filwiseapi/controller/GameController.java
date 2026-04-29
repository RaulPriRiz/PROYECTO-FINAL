package com.filmwiseapp.filwiseapi.controller;

import org.springframework.web.bind.annotation.*;
import com.filmwiseapp.filwiseapi.dao.GameRepository;
import com.filmwiseapp.filwiseapi.dto.GameRequest;
import com.filmwiseapp.filwiseapi.dto.NameRequest;
import com.filmwiseapp.filwiseapi.dto.RecentGameResponse;
import com.filmwiseapp.filwiseapi.model.Game;
import java.util.List;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "*") // permite a React llamar a la api
public class GameController {

    private final GameRepository repo;

    public GameController(GameRepository repo) {
        this.repo = repo;
    }

    @PostMapping("/newGame")
    public Game createNewGame(@RequestBody GameRequest gameRequest) {
        return repo.createGame(gameRequest.getUserName(), gameRequest.getFilmTitle(), gameRequest.getMode());
    }

    @PostMapping("/update")
    public void updateGame(@RequestBody GameRequest gameRequest) {
        repo.updateGame(gameRequest.getUserName(), gameRequest.getFilmTitle(), gameRequest.getLastTime());
    }

    @PostMapping("/recent")
    public List<RecentGameResponse> getRecentGames(@RequestBody NameRequest nameRequest) {
        return repo.findRecentGames(nameRequest.getName());
    }

    @PostMapping("/recent/oneGame")
    public Game getMostRecent(@RequestBody GameRequest gameRequest){
        return repo.findMostRecentGame(gameRequest.getUserName(), gameRequest.getFilmTitle());
    }

    @PostMapping("/editScore")
     public void editScore(@RequestBody GameRequest gameRequest) {
        repo.editScore(gameRequest.getUserName(), gameRequest.getFilmTitle(), gameRequest.getScore());
    }

    @PostMapping("/editIsFinished")
    public void editIsFinished(@RequestBody GameRequest gameRequest){
        repo.editIsFinished(gameRequest.getUserName(), gameRequest.getFilmTitle());
    }
}
