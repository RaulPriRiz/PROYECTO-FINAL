package com.filmwiseapp.filwiseapi;

import jakarta.persistence.*;

@Entity
@Table(name = "Usuario")
public class User {

    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
   // @GeneratedValue : le dice a JPA/Hibernate que el id se genera automáticamente.
  //strategy = GenerationType.IDENTITY : la base de datos se encarga de generar el id, normalmente con una columna AUTO_INCREMENT.
    private int id;

    private String name;
    private String email;
    private String password;
    private String rol; // invitado registrado o admin

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

}