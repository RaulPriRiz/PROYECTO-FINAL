package com.filmwiseapp.filwiseapi.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Film")
public class Film {
    
    @Id
    private int id;

    private String title;
    private String genre;
    private String image;

    public Film() {
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getGenre() {
        return genre;
    }

    public String getImage() {
        return image;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public void setImage(String image) {
        this.image = image;
    }

}
