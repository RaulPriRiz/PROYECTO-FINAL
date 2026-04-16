package com.filmwiseapp.filwiseapi.model;
import jakarta.persistence.*;

@Entity
@Table
//AQUI SE GUARDAN SOLO LAS PREGUNTAS RESPONDIDAS EN UNA PARTIDA
public class GameQuestion {

    @Id
    private int id;
    
    private Integer gameId;
    private Integer questionId;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getGameId() {
        return gameId;
    }

    public void setGameId(Integer gameId) {
        this.gameId = gameId;
    }

    public Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }
}
