package com.filmwiseapp.filwiseapi.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Usuario")
public class User {

    @Id
    private int id;

    private String name;
    private String email;
    private String password;
    private String rol; //invitado, registrado o admin
    private Integer score;
    private String image;
    private String favoriteGenre;
    private Integer bestScore;
    private Integer gamesPlayed;
    private Integer correctAnswers;
    private Integer levelId;
    //transient sirve para que no cree un campo nuevo a la tabla Usuario en la BD. Este levelName lo usamos SOLO cuando hacemos el join con la tabla LEVEL
    @Transient
    private String levelName;

    public User() {
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getRol() {
        return rol;
    }

    public Integer getScore() {
       return score;
    }

    public String getImage(){
        return image;
    }

    public String getFavoriteGenre(){
        return favoriteGenre;
    }

    public Integer getBestScore() {
       return bestScore;
    }

    public Integer getGamesPlayed() {
       return gamesPlayed;
    }

    public Integer getCorrectAnswers() {
       return correctAnswers;
    }

    public Integer getLevelId(){
        return levelId;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public void setScore(Integer score){
        this.score = score;
    }

    public void setImage(String image){
        this.image = image;
    }

    public void setFavoriteGenre(String favoriteGenre){
        this.favoriteGenre = favoriteGenre;
    }

    public void setBestScore(Integer bestScore){
        this.bestScore = bestScore;
    }

    public void setGamesPlayed(Integer gamesPlayed){
        this.gamesPlayed = gamesPlayed;
    }

    public void setCorrectAnswers(Integer correctAnswers){
        this.correctAnswers = correctAnswers;
    }

    public void setLevelId(Integer levelId){
        this.levelId = levelId;
    }

    public String getLevelName() {
        return levelName;
    }

    public void setLevelName(String levelName) {
        this.levelName = levelName;
    }
    
}