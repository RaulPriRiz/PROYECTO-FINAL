package com.filmwiseapp.filwiseapi.dto;

public class EditMessageStatus {
    
    private String nameEmisor;
    private String newStatus;
    private String nameReceptor; //En el caso de que se vaya a crear una nueva amistad (si newStatus = ACEPTADA) lo necesitamos

    public String getNameEmisor() {
        return nameEmisor;
    }

    public void setNameEmisor(String nameEmisor) {
        this.nameEmisor = nameEmisor;
    }

    public String getNewStatus() {
        return newStatus;
    }

    public void setNewStatus(String newStatus) {
        this.newStatus = newStatus;
    }

     public String getNameReceptor() {
        return nameReceptor;
    }

    public void setNameReceptor(String nameReceptor) {
        this.nameReceptor = nameReceptor;
    }
}
