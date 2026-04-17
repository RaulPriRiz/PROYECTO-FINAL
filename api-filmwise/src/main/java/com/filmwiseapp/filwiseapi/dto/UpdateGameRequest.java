package com.filmwiseapp.filwiseapi.dto;

public class UpdateGameRequest {
    
    private int userId;
    private int filmId;
    private int lastSeconds;

    public UpdateGameRequest(){}
    
    public int getUserId() { 
        return userId; 
    }

    public int getFilmId() {
        return filmId;
    }

    public void setUserId(int userId) { 
        this.userId = userId; 
    }

    public void setFilmId(int filmId) { 
        this.filmId = filmId; 
    }

    public int getLastSeconds() { 
        return lastSeconds; 
    }
    public void setLastSeconds(int lastSeconds) { 
        this.lastSeconds = lastSeconds; 
    }
}
