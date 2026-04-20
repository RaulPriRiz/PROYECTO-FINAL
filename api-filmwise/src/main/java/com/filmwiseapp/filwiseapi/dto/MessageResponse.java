package com.filmwiseapp.filwiseapi.dto;

import java.time.LocalDate;

public class MessageResponse {

    public String emisorName;
    public String status;
    public String filmTitle; 
    public LocalDate date;

    public String getEmisorName() {
        return emisorName;
    }

    public void setEmisorName(String emisorName) {
        this.emisorName = emisorName;
    }

    public String getFilmTitle(){
        return filmTitle;
    }

    public void setFilmTitle(String filmTitle){
        this.filmTitle = filmTitle;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setDate(LocalDate date){
        this.date = date;
    }

    public LocalDate getDate(){
        return date;
    }
}
