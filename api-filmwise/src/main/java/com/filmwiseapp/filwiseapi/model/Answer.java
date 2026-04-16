package com.filmwiseapp.filwiseapi.model;

import jakarta.persistence.*;

@Entity
@Table
public class Answer {
    
    @Id
    private int id;

    private Integer questionId;
    private String answerText;
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

    public String getAnswerText() {
        return answerText;
    }

    public void setAnswerText(String answerText) {
        this.answerText = answerText;
    }

    public boolean isCorrect() {
        return isCorrect;
    }

    public void setCorrect(boolean correct) {
        isCorrect = correct;
    }



}
