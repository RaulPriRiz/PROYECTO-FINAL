package com.filmwiseapp.filwiseapi.dto;

public class EditNumber {
    
    private String name;
    private int number;

    public EditNumber(){

    }

    public String getName(){
        return name;
    }
    public int getNumber(){
        return number;
    }

    public void setName(String name){
        this.name = name;
    }

    public void setNumber(int number){
        this.number = number;
    }
}
