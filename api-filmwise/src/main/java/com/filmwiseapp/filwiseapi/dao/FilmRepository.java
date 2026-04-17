package com.filmwiseapp.filwiseapi.dao;

import java.util.List;
import org.springframework.stereotype.Repository;
import com.filmwiseapp.filwiseapi.model.Film;
import com.filmwiseapp.filwiseapi.model.Question;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;

@Repository
public class FilmRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Film> findAll() {
        
        String sql = "SELECT * FROM Film";

        return (List<Film>) entityManager.createNativeQuery(sql, Film.class).getResultList();
    }

    public List<Film> findNewFilms() {
        
        String sql = "SELECT * FROM Film WHERE CREATION_DATE >= CURRENT_DATE - INTERVAL '7 days'";    

        return (List<Film>) entityManager.createNativeQuery(sql, Film.class).getResultList();
    }

    public Film findFilm(String title) {

        String sql = "SELECT * FROM Film where TITLE = '" + title + "'";

        try{
            return (Film) entityManager.createNativeQuery(sql, Film.class).getSingleResult();
        } catch(NoResultException e){
            return null;
        }
    }

    public List<Question> findFilmQuestions(String title){
        
        Film film = findFilm(title);
        
        String sql = "SELECT * FROM QUESTION where FILM_ID = " + film.getId();

        return (List<Question>) entityManager.createNativeQuery(sql, Question.class).getResultList();
    }
}
