package com.filmwiseapp.filwiseapi.controller;

import org.springframework.web.bind.annotation.*;

import com.filmwiseapp.filwiseapi.dao.AnswerRepository;
import com.filmwiseapp.filwiseapi.dao.FilmRepository;
import com.filmwiseapp.filwiseapi.dto.NameRequest;
import com.filmwiseapp.filwiseapi.dto.QuestionResponse;
import com.filmwiseapp.filwiseapi.model.Answer;
import com.filmwiseapp.filwiseapi.model.Film;
import com.filmwiseapp.filwiseapi.model.Question;
import jakarta.persistence.NoResultException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/films")
@CrossOrigin(origins = "*") // permite a React llamar a la api
public class FilmController {

    private final FilmRepository repo;
    private final AnswerRepository answerRepository;

    public FilmController(FilmRepository repo, AnswerRepository answerRepository) {
        this.repo = repo;
        this.answerRepository = answerRepository;

    }

    @GetMapping
    public List<Film> getFilms() {
        return repo.findAll();
    }

    // devuelve solo las pelis con fecha de máximo hace una semana
    @GetMapping("/newfilms")
    public List<Film> getUserNewFilms() {
        return repo.findNewFilms();
    }

    // hemos reutilizado nameRequest porque al fin y al cabo es un DTO que manda un
    // string y punto y nos sirve tambien para este caso
    @PostMapping("/film")
    public Film getFilm(@RequestBody NameRequest nameRequest) {

        System.out.println("BUSCANDO PELI: " + nameRequest.getName()); 

        try {
            return repo.findFilm(nameRequest.getName());
        } catch (NoResultException e) {
            return null;
        }
    }

    // coge todas las preguntas con ese nombre de pelicula y devuelve una lista de
    // QuestionReponse que es un dto con pregunta + List de sus answers
    @PostMapping("/film/questions")
    public List<QuestionResponse> getFilmQuestions(@RequestBody NameRequest nameRequest) {

        List<QuestionResponse> res = new ArrayList<>();

        List<Question> questions = repo.findFilmQuestions(nameRequest.getName());

        // Vamos creando cada QuestionResponse y vamos añadiendo por cada question sus
        // answers y sus questionText y startSeconds:
        for (Question question : questions) {

            QuestionResponse questionResponse = new QuestionResponse();
            questionResponse.setQuestionText(question.getQuestionText());
            questionResponse.setStartSeconds(question.getstartSeconds());

            // encontramos en la BD las answers a cada pregunta y las añadimos
            List<Answer> answers = answerRepository.findAnswers(question.getId());

            questionResponse.setAnswers(answers);

            res.add(questionResponse);
        }

        return res;
    }
}
