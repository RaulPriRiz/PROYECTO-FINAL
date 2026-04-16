package com.filmwiseapp.filwiseapi.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table
public class Game {

    @Id
    private int id;

    private Integer userId;
    private Integer filmId;
    private String mode;
    private LocalDate lastPlayed;
    private Integer lastTime; //por qué segundos de la pelicula ha dejado la pelicula

    public Game() {
    }

    public int getId() {
        return id;
    }

    public int getUserId() {
        return userId;
    }

    public int getFilmId() {
        return filmId;
    }

    public String getMode() {
        return mode;
    }

    public LocalDate getLastPlayed() {
        return lastPlayed;
    }

    public Integer getLastTime(){
        return lastTime;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setFilmId(Integer filmId) {
        this.filmId = filmId;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public void setLastPlayed(LocalDate lastPlayed) {
        this.lastPlayed = lastPlayed;
    }

    public void setLastTime(Integer lastTime){
        this.lastTime = lastTime;
    }


}