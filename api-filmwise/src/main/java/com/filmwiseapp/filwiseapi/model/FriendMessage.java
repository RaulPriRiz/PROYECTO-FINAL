package com.filmwiseapp.filwiseapi.model;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table
public class FriendMessage {
    
    @Id
    private int id;

    private Integer idUserEmisor;
    private Integer idUserReceptor;
    private String status;
    private LocalDate date;

    public FriendMessage(){}
    
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getDate(){
        return date;
    }
    public void setLocalDate(LocalDate date){
        this.date = date;
    }
}
