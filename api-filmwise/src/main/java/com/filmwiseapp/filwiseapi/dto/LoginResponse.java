package com.filmwiseapp.filwiseapi.dto;

public class LoginResponse {

    private boolean success;
    private String message;
    private String token;
    private String name;
    private String rol;

    public LoginResponse() {
    }

    public LoginResponse(boolean success, String message, String token, String name, String rol) {
        this.success = success;
        this.message = message;
        this.token = token;
        this.name = name;
        this.rol = rol;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public String getToken() {
        return token;
    }

    public String getName() {
        return name;
    }

    public String getRol() {
        return rol;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}
