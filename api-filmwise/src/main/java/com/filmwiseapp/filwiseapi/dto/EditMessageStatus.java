package com.filmwiseapp.filwiseapi.dto;

public class EditMessageStatus {
    
    private Integer id;
    private String newStatus;
    private String emisorName;
    private String receptorName;

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

    public String getEmisorName(){
        return emisorName;
    }

    public void setEmisorName(String emisorName){
        this.emisorName = emisorName;
    }

       public String getReceptorName(){
        return receptorName;
    }

    public void setReceptorName(String receptorName){
        this.receptorName = receptorName;
    }
}
