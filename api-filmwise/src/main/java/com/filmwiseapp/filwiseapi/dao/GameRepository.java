package com.filmwiseapp.filwiseapi.dao;

import org.springframework.stereotype.Repository;
import com.filmwiseapp.filwiseapi.model.Game;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
public class GameRepository {
    
    @PersistenceContext
    private EntityManager entityManager;

    //creamos un nuevo registro de Game con el id de usuario y el de pelicula

    public Integer getMaxId() {

        String sql = "SELECT MAX(id) FROM Game";

        try {
            return (Integer) entityManager.createNativeQuery(sql).getSingleResult();
        } catch (Exception e) {
            return 0;
        }
    }

    @Transactional
    public Game createGame(Game game){
        Integer maxId = getMaxId();
        
        if (maxId == null) {
            maxId = 0;
        }

        game.setId(maxId + 1);

        entityManager.persist(game);

        return game;
    }


    //funcion de charles para coger las últimas partidas (ordenalas por fecha mayor) y coge unas cuantas para el home:

    
}
