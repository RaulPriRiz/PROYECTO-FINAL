package com.filmwiseapp.filwiseapi.model;

import jakarta.persistence.*;

@Entity
@Table
public class UserCompleteMission {
    
    
    @Id
    private int id;

    private Integer userId;
    private Integer missionId;
    private Integer pointsCompleted;

    public int getId() {
        return id;
    }

    public Integer getUserId() {
        return userId;
    }

    public Integer getMissionId() {
        return missionId;
    }

    public Integer getPointsCompleted() {
        return pointsCompleted;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setMissionId(Integer missionId) {
        this.missionId = missionId;
    }

    public void setPointsCompleted(Integer pointsCompleted) {
        this.pointsCompleted = pointsCompleted;
    }
}
