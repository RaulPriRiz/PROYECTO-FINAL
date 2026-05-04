package com.filmwiseapp.filwiseapi.dto;

public class MessageRequest {
    
    
    public String emisorName;
    public String receptorName;
    public String messageText;

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

    public String getMessageText(){
        return messageText;
    }
    public void setMessageText(String messageText){
        this.messageText = messageText;
    }
}
