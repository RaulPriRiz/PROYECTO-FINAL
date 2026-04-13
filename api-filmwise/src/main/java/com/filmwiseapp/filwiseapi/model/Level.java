package com.filmwiseapp.filwiseapi.model;

import jakarta.persistence.*;

@Entity
@Table
public class Level {
    
    @Id
    private int id;
    private String name;

    public Level(){}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
