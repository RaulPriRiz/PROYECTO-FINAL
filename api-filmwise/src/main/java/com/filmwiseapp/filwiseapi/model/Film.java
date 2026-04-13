package com.filmwiseapp.filwiseapi.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table
public class Film {
    
    @Id
    private int id;

    private String title;
    private String genre;
    private String image;
    private LocalDate creationDate;

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

    public LocalDate getCreationDate() {
        return creationDate;
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

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }
}
