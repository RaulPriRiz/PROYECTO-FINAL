package com.filmwiseapp.filwiseapi.dto;

public class GameRequest {
    
    private String userName;
    private String filmTitle;
    private String mode;
    private Integer lastTime;
    private Integer score;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getFilmTitle() {
        return filmTitle;
    }

    public Integer getLastTime(){
        return lastTime;
    }

    public void setFilmTitle(String filmTitle) {
        this.filmTitle = filmTitle;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public void setLastTime(Integer lastTime){
        this.lastTime = lastTime;
    }

    public Integer getScore(){
        return score;
    }

    public void setScore(Integer score){
        this.score = score;
    }
}
