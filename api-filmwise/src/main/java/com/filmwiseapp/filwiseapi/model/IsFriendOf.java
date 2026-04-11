package com.filmwiseapp.filwiseapi.model;

import jakarta.persistence.*;

@Entity
@Table
public class IsFriendOf {

    @Id
    private int id;
    
    private Integer Friend1;
    private Integer Friend2; 

    public IsFriendOf(){}

    public Integer getFriend1(){
        return Friend1;
    }
    public Integer getFriend2(){
        return Friend2;
    }
    public void setFriend1(Integer Friend1){
        this.Friend1 = Friend1;
    }
    public void setFriend2(Integer Friend2){
        this.Friend2 = Friend2;
    }


}