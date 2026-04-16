package com.filmwiseapp.filwiseapi.dto;

public class FriendRequest {
    
    
    public String emisorName;
    public String receptorName;

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
}
