package com.filmwiseapp.filwiseapi.dto;

public class EditScore {
    
    private String name;
    private int scoreIncrease;

    public EditScore(){

    }

    public String getName(){
        return name;
    }
    public int getScoreIncrease(){
        return scoreIncrease;
    }

    public void setName(String name){
        this.name = name;
    }

    public void setScoreIncrease(int scoreIncrease){
        this.scoreIncrease = scoreIncrease;
    }
}
