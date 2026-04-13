package com.filmwiseapp.filwiseapi.dto;

public class MissionResponse {
    
    private String descripcion;
    private Integer points;
    private Integer pointsCompleted;

    public MissionResponse() {}

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public Integer getPointsCompleted() {
        return pointsCompleted;
    }

    public void setPointsCompleted(Integer pointsCompleted) {
        this.pointsCompleted = pointsCompleted;
    }

}
