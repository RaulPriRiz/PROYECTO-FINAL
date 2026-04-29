package com.filmwiseapp.filwiseapi.dao;

import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Repository;
import com.filmwiseapp.filwiseapi.model.Film;
import com.filmwiseapp.filwiseapi.model.Question;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
public class FilmRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Film> findAll() {

        String sql = "SELECT * FROM Film ORDER BY TITLE ASC";

        return (List<Film>) entityManager.createNativeQuery(sql, Film.class).getResultList();
    }

    public List<Film> findNewFilms() {

        String sql = "SELECT * FROM Film WHERE CREATION_DATE >= DATEADD('DAY', -7, CURRENT_DATE)";

        return entityManager.createNativeQuery(sql, Film.class).getResultList();
    }

    public Film findFilm(String title) {

        String sql = "SELECT * FROM Film where TITLE = '" + title + "'";

        try {
            return (Film) entityManager.createNativeQuery(sql, Film.class).getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    public List<Question> findFilmQuestions(String title) {

        Film film = findFilm(title);

        String sql = "SELECT * FROM QUESTION where FILM_ID = " + film.getId();

        return (List<Question>) entityManager.createNativeQuery(sql, Question.class).getResultList();
    }

    @Transactional
    public void createFilm(Film film) {

        Integer maxId = getMaxId();

        if (maxId == null) {
            maxId = 0;
        }

        film.setId(maxId + 1);
        LocalDate today = java.time.LocalDate.now();
        film.setCreationDate(today);
        entityManager.persist(film);
    } 

    public Integer getMaxId() {

        String sql = "SELECT MAX(id) FROM Film";

        try {
            return (Integer) entityManager.createNativeQuery(sql).getSingleResult();
        } catch (Exception e) {
            return 0;
        }
    }

    
    //si eliminamos una pelicula tambien debemos eliminar todas sus preguntas y sus respuestas
    @Transactional
    public void deleteFilm(String title){
        
        Film film = findFilm(title);

        //primero tengo que saber qué respuestas son las que tengo que borrar. Entonces para ello saco los IDs de las preguntas que tienen ese id film
        String sql = "SELECT ID FROM QUESTION WHERE FILM_ID = " + film.getId();
        List<Object> idsQuestions = entityManager.createNativeQuery(sql).getResultList();
        //Ahora recorremos todos los ids de las preguntas que tenemos y por cada una borramos sus respuestas
        for (Object object : idsQuestions) {
            String sql2 = "DELETE FROM ANSWER WHERE QUESTION_ID = " + object; 
            entityManager.createNativeQuery(sql2).executeUpdate();
        }
        String sql3 = "DELETE FROM QUESTION WHERE FILM_ID = " + film.getId(); 
        entityManager.createNativeQuery(sql3).executeUpdate();
        String sql4 = "DELETE FROM FILM WHERE TITLE = '" + title + "'";

        entityManager.createNativeQuery(sql4).executeUpdate();
    }

    @Transactional
    public void updateFilm(Film film) {
        //merge se encarga de hacer el UPDATE de todos los campos basándose en el ID
        entityManager.merge(film); 
    } 
}