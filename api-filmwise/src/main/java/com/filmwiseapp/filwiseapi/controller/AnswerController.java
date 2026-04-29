package com.filmwiseapp.filwiseapi.controller;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.filmwiseapp.filwiseapi.dao.AnswerRepository;
import com.filmwiseapp.filwiseapi.model.Answer;

@RestController
@RequestMapping("/api/answers")
@CrossOrigin(origins = "*") // permite a React llamar a la api
public class AnswerController {
    
    private final AnswerRepository repo;

    public AnswerController(AnswerRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Answer> getAnswers() {
        return repo.findAll();
    }

    @PostMapping("/updateAnswer")
    public void updateAnswer(@RequestBody Answer answer){
        repo.updateAnswer(answer);
    }

    @PostMapping("/deleteAnswer")
    public void deleteAnswer(@RequestBody Answer answer){
        repo.deleteAnswer(answer);
    }

    @PostMapping("/newAnswer")
    public void createNewAnswer(@RequestBody Answer answer){
        repo.createAnswer(answer);
    }
}
