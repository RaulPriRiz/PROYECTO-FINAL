package com.filmwiseapp.filwiseapi.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.filmwiseapp.filwiseapi.dao.QuestionRepository;
import com.filmwiseapp.filwiseapi.model.Question;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "*") // permite a React llamar a la api
public class QuestionController {
    
    private final QuestionRepository repo;

    public QuestionController(QuestionRepository repo) {
        this.repo = repo;
    }

     @GetMapping
    public List<Question> getQuestions() {
        return repo.findAll();
    }

    @PostMapping("/updateQuestion")
    public void updateQuestion(@RequestBody Question question){
        repo.updateQuestion(question);
    }

    @PostMapping("/deleteQuestion")
    public void deleteQuestion(@RequestBody Question question){
        repo.deleteQuestion(question);
    }

    @PostMapping("/newQuestion")
    public void createNewQuestion(@RequestBody Question question){
        repo.createQuestion(question);
    }


}
