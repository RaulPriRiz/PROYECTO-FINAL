package com.filmwiseapp.filwiseapi.dto;

public class UpdateGameRequest {
    private int id;
    private int lastSeconds;

   
    public int getId() { 
        return id; 
    }
    public void setId(int id) { 
        this.id = id; 
    }
    public int getLastSeconds() { 
        return lastSeconds; 
    }
    public void setLastSeconds(int lastSeconds) { 
        this.lastSeconds = lastSeconds; 
    }
}
