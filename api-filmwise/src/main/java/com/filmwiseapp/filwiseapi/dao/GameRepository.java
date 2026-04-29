package com.filmwiseapp.filwiseapi.dao;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;
import com.filmwiseapp.filwiseapi.dto.RecentGameResponse;
import com.filmwiseapp.filwiseapi.model.Film;
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
    private final FilmRepository filmRepository;

    public GameRepository(UserRepository userRepository, FilmRepository filmRepository) {
        this.userRepository = userRepository;
        this.filmRepository = filmRepository;
    }

    //creamos un nuevo registro de Game con el id de usuario y el de pelicula
    //cuando el usuario pulsa jugar partida o lo que sea
    public Integer getMaxId() {

        String sql = "SELECT MAX(id) FROM Game";

        try {
            return (Integer) entityManager.createNativeQuery(sql).getSingleResult();
        } catch (Exception e) {
            return 0;
        }
    }

    @Transactional
    public Game createGame(String userName, String filmTitle, String mode) {
        
        Game existingGame = findGame(userName, filmTitle, mode);

        if (existingGame != null) {
            return existingGame;
        }
        
        Integer maxId = getMaxId();

        if (maxId == null) {
            maxId = 0;
        }

        Game game = new Game();
        User user = userRepository.findByName(userName);
        Film film = filmRepository.findFilm(filmTitle);

        game.setId(maxId + 1);
        game.setFilmId(film.getId());
        game.setUserId(user.getId());
        game.setMode(mode);
        game.setLastTime(0);
        game.setScore(0);
        game.setIsFinished(false);
        LocalDate today = java.time.LocalDate.now();
        game.setLastPlayed(today);
        entityManager.persist(game);

        return game;
    }

    @Transactional
    public void updateGame(String userName, String filmTitle, int lastTime) {

        String today = java.time.LocalDate.now().toString();

        User user = userRepository.findByName(userName);
        Film film = filmRepository.findFilm(filmTitle);

        String sql = "UPDATE Game SET LAST_TIME = " + lastTime + ", LAST_PLAYED = '" + today + "' WHERE FILM_ID = "
                + film.getId() + " AND USER_ID = " + user.getId();

        entityManager.createNativeQuery(sql).executeUpdate();
    }

    public Game findGame(String userName, String filmTitle, String mode) {
        
        User user = userRepository.findByName(userName);
        Film film = filmRepository.findFilm(filmTitle);

        String sql = "SELECT * FROM Game where USER_ID = " + user.getId() + " AND FILM_ID = " + film.getId() + " AND MODE = '" + mode + "' AND IS_FINISHED = FALSE";

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

    @Transactional
    public void editScore(String userName, String filmTitle, int scoreIncrease){
        
        User user = userRepository.findByName(userName);
        Film film = filmRepository.findFilm(filmTitle);

        String sql = "UPDATE Game SET SCORE = SCORE + " + scoreIncrease + " WHERE FILM_ID = " + film.getId() + " AND USER_ID = " + user.getId();

        entityManager.createNativeQuery(sql).executeUpdate();
    }

    @Transactional
    public void editIsFinished(String userName, String filmTitle){
        
        User user = userRepository.findByName(userName);
        Film film = filmRepository.findFilm(filmTitle);

        String sql = "UPDATE Game SET IS_FINISHED = TRUE WHERE FILM_ID = " + film.getId() + " AND USER_ID = " + user.getId();

        entityManager.createNativeQuery(sql).executeUpdate();
    }
}
