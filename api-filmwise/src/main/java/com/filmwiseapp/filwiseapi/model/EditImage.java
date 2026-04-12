package com.filmwiseapp.filwiseapi.model;

public class EditImage {

    private String name;
    private String newImage;

    public EditImage() {
    }

    public EditImage(String name, String newImage) {
        this.name = name;
        this.newImage = newImage;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNewImage() {
        return newImage;
    }

    public void setNewImage(String newImage) {
        this.newImage = newImage;
    }
}
