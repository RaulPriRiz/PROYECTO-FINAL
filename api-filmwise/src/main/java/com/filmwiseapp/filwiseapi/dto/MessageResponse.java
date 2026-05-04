package com.filmwiseapp.filwiseapi.dto;

import java.time.LocalDate;

public class MessageResponse {

    public String emisorName;
    public String status;
    public String messageText;
    public LocalDate date;

    public String getEmisorName() {
        return emisorName;
    }

    public void setEmisorName(String emisorName) {
        this.emisorName = emisorName;
    }

    public String getMessageText(){
        return messageText;
    }

    public void setMessageText(String messageText){
        this.messageText = messageText;
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
