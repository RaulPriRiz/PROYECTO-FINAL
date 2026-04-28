package com.filmwiseapp.filwiseapi.dto;

import com.filmwiseapp.filwiseapi.model.Answer;
import java.util.*;

public class QuestionResponse {
    
    private int id;
    private String questionText;
    private int startSeconds;
    private List<Answer> answers;


    public QuestionResponse(){}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    
    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public int getStartSeconds() {
        return startSeconds;
    }

    public void setStartSeconds(int startSeconds) {
        this.startSeconds = startSeconds;
    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }
}
