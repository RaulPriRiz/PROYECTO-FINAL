package com.filmwiseapp.filwiseapi.model;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table
public class ChallengeMessage {
    
    @Id
    private int id;

    private Integer idUserEmisor;
    private Integer idUserReceptor;
    private String messageText;
    private LocalDate date;
    private String status;

    public ChallengeMessage(){}
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getIdUserEmisor() {
        return idUserEmisor;
    }

    public void setIdUserEmisor(Integer idUserEmisor) {
        this.idUserEmisor = idUserEmisor;
    }

    public Integer getIdUserReceptor() {
        return idUserReceptor;
    }

    public void setIdUserReceptor(Integer idUserReceptor) {
        this.idUserReceptor = idUserReceptor;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public LocalDate getDate(){
        return date;
    }

    public void setDate(LocalDate date){
        this.date = date;
    }

    public String getStatus(){
        return status;
    }

    public void setStatus(String status){
        this.status = status;
    }
}
