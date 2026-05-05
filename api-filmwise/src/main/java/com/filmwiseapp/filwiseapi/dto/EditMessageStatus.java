package com.filmwiseapp.filwiseapi.dto;

public class EditMessageStatus {
    
    private Integer id;
    private String newStatus;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNewStatus() {
        return newStatus;
    }

    public void setNewStatus(String newStatus) {
        this.newStatus = newStatus;
    }
}
