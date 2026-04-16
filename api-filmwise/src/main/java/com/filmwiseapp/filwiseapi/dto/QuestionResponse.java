package com.filmwiseapp.filwiseapi.dto;

import com.filmwiseapp.filwiseapi.model.Answer;
import java.util.*;

public class QuestionResponse {
    
    private String questionText;
    private int startSeconds;
    private List<Answer> answers;


    public QuestionResponse(){}
    
    // Getter y Setter para questionText
    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    // Getter y Setter para startSeconds
    public int getStartSeconds() {
        return startSeconds;
    }

    public void setStartSeconds(int startSeconds) {
        this.startSeconds = startSeconds;
    }

    // Getter y Setter para answer
    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }
}
