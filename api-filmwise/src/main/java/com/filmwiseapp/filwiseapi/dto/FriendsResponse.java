package com.filmwiseapp.filwiseapi.dto;

public class FriendsResponse {

    public String emisorName;
    public String status;

    public String getEmisorName() {
        return emisorName;
    }

    public void setEmisorName(String emisorName) {
        this.emisorName = emisorName;
    }

    // Getter y Setter para status
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
