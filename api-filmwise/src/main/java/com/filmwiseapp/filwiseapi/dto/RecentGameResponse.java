package com.filmwiseapp.filwiseapi.dto;

public class RecentGameResponse {

    private Integer userId;
    private Integer filmId;
    private String mode;
    private String image;
    private String title;

    public RecentGameResponse() {
    }

    public int getUserId() {
        return userId;
    }

    public int getFilmId() {
        return filmId;
    }

    public String getMode() {
        return mode;
    }

    public String getImage() {
        return image;
    }

    public String getTitle() {
        return title;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setFilmId(Integer filmId) {
        this.filmId = filmId;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
