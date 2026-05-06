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
    private LocalDate insertDate;
    private String videoUrl;
    private String mode; 

    @Column(name = "IMAGE_CARROUSEL", length = 500)
    private String imageCarrousel;

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

    public LocalDate getInsertDate() {
        return insertDate;
    }

    public String getVideoUrl(){
        return videoUrl;
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

    public void setInsertDate(LocalDate creationDate) {
        this.insertDate = creationDate;
    }

    public void setVideoUrl(String videoUrl){
        this.videoUrl = videoUrl;
    }

    public String getImageCarrousel(){
        return imageCarrousel;
    }

    public void setImageCarrousel(String imageCarrousel){
        this.imageCarrousel = imageCarrousel;
    }

    public String getMode(){
        return mode;
    }

    public void setMode(String mode){
        this.mode = mode;
    }
}
