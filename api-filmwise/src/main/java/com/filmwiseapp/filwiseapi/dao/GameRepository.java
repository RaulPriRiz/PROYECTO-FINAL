package com.filmwiseapp.filwiseapi.dao;

import org.springframework.stereotype.Repository;
import com.filmwiseapp.filwiseapi.model.Game;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
public class GameRepository {
    
    @PersistenceContext
    private EntityManager entityManager;

    //creamos un nuevo registro de Game con el id de usuario y el de pelicula cuando el usuario pulsa jugar partida o lo que sea
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

    @Transactional
    public void updateGame(int userId, int filmId, int lastTime) {
        
        String today = java.time.LocalDate.now().toString();

        String sql = "UPDATE Game SET LAST_TIME = " + lastTime + ", LAST_PLAYED = '" + today + "' WHERE FILM_ID = " + filmId + " AND USER_ID = " + userId;

        entityManager.createNativeQuery(sql).executeUpdate();
    }

    public Game findGame(int idUser, int idFilm){
        
        String sql = "SELECT * FROM Game where USER_ID = " + idUser + " AND FILM_ID = " + idFilm;

          try{
            return (Game) entityManager.createNativeQuery(sql, Game.class).getSingleResult();
        } catch(NoResultException e){
            return null;
        }

    }

    //funcion de charles para coger las últimas partidas (ordenalas por fecha mayor) y coge unas cuantas para el home junto con la imagen de la pelicula (join):

    
}
