package com.filmwiseapp.filwiseapi.model;

import jakarta.persistence.*;

@Entity
@Table
public class Answer {
    
    @Id
    private int id;

    private Integer questionId;
    private String answertext;
    private boolean isCorrect;
    
    public Answer(){

    }
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getQuestionId(){
        return questionId;
    }

    public void setIdQuestion(Integer idQuestion){
        this.questionId = idQuestion;
    }

    public String getAnswertext() {
        return answertext;
    }

    public void setAnswertext(String answertext) {
        this.answertext = answertext;
    }

    public boolean isCorrect() {
        return isCorrect;
    }

    public void setCorrect(boolean correct) {
        isCorrect = correct;
    }



}
