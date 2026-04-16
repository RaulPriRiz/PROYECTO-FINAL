package com.filmwiseapp.filwiseapi.model;

import jakarta.persistence.*;

@Entity
@Table
public class Question {
    
    @Id
    private int id;

    private Integer filmId;
    private String questionText;
    private Integer startSeconds;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getFilmId() {
        return filmId;
    }

    public Integer getstartSeconds(){
        return startSeconds;
    }

    public void setFilmId(Integer filmId) {
        this.filmId = filmId;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public void setStartSeconds(Integer startSeconds){
        this.startSeconds = startSeconds;
    }
}
