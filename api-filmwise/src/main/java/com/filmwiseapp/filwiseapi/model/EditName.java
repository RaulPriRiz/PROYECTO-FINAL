package com.filmwiseapp.filwiseapi.model;

public class EditName {

    private String oldName;
    private String newName;

    public EditName() {
    }

    // Getter oldName
    public String getOldName() {
        return oldName;
    }

    // Setter oldName
    public void setOldName(String oldName) {
        this.oldName = oldName;
    }

    // Getter newName
    public String getNewName() {
        return newName;
    }

    // Setter newName
    public void setNewName(String newName) {
        this.newName = newName;
    }
}

