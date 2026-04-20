package com.filmwiseapp.filwiseapi.dao;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.filmwiseapp.filwiseapi.dto.RecentGameResponse;
import com.filmwiseapp.filwiseapi.model.Game;
import com.filmwiseapp.filwiseapi.model.User;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
public class GameRepository {

    @PersistenceContext
    private EntityManager entityManager;

    private final UserRepository userRepository;

    public GameRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    // creamos un nuevo registro de Game con el id de usuario y el de pelicula
    // cuando el usuario pulsa jugar partida o lo que sea
    public Integer getMaxId() {

        String sql = "SELECT MAX(id) FROM Game";

        try {
            return (Integer) entityManager.createNativeQuery(sql).getSingleResult();
        } catch (Exception e) {
            return 0;
        }
    }

    @Transactional
    public Game createGame(Game game) {
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

        String sql = "UPDATE Game SET LAST_TIME = " + lastTime + ", LAST_PLAYED = '" + today + "' WHERE FILM_ID = "
                + filmId + " AND USER_ID = " + userId;

        entityManager.createNativeQuery(sql).executeUpdate();
    }

    public Game findGame(int idUser, int idFilm) {

        String sql = "SELECT * FROM Game where USER_ID = " + idUser + " AND FILM_ID = " + idFilm;

        try {
            return (Game) entityManager.createNativeQuery(sql, Game.class).getSingleResult();
        } catch (NoResultException e) {
            return null;
        }

    }

    public List<RecentGameResponse> findRecentGames(String name) {

        User user = userRepository.findByName(name);
        String sql = "SELECT g.FILM_ID, g.MODE, f.TITLE, f.IMAGE, g.USER_ID FROM Game g INNER JOIN Film f ON g.FILM_ID = f.ID WHERE USER_ID = " + user.getId() + " ORDER BY g.LAST_PLAYED DESC LIMIT 4";

        List<RecentGameResponse> res = new ArrayList<>();

        List<Object[]> results = (List<Object[]>) entityManager.createNativeQuery(sql).getResultList();

        for(Object[] row : results) {
            RecentGameResponse recentGameResponse = new RecentGameResponse();

            recentGameResponse.setFilmId((Integer)row[0]);
            recentGameResponse.setMode((String)row[1]);
            recentGameResponse.setTitle((String)row[2]);
            recentGameResponse.setImage((String)row[3]);
            recentGameResponse.setUserId((Integer)row[4]);
            res.add(recentGameResponse);
        }

        return res;
    }

}
