package com.filmwiseapp.filwiseapi.dao;

import java.util.List;
import org.springframework.stereotype.Repository;
import com.filmwiseapp.filwiseapi.model.Film;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
public class FilmRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Film> findAll() {
        
        String sql = "SELECT * FROM Film";

        return (List<Film>) entityManager.createNativeQuery(sql, Film.class).getResultList();
    }
}
