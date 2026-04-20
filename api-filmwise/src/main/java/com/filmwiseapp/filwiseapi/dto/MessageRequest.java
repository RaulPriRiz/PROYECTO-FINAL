package com.filmwiseapp.filwiseapi.dto;

public class MessageRequest {
    
    
    public String emisorName;
    public String receptorName;
    public String filmTitle;

    public String getEmisorName() {
        return emisorName;
    }

    public void setEmisorName(String emisorName) {
        this.emisorName = emisorName;
    }

    public String getReceptorName() {
        return receptorName;
    }

    public void setReceptorName(String receptorName) {
        this.receptorName = receptorName;
    }

    public String getFilmTitle(){
        return filmTitle;
    }
    public void setFilmTitle(String filmTitle){
        this.filmTitle = filmTitle;
    }
}
