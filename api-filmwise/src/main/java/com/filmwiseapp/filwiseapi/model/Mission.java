package com.filmwiseapp.filwiseapi.model;

import jakarta.persistence.*;

@Entity
@Table
public class Mission {
    

    @Id
    private int id;

    private Integer points;
    private String descripcion;

    public Mission(){
    }

    public int getId() {
        return id;
    }

    public Integer getPoints() {
        return points;
    }

    public String getDescripcion() {
        return descripcion;
    }


    public void setId(int id) {
        this.id = id;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
