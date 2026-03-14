package com.filmwiseapp.filwiseapi;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    //JpaRepository crea métodos automaticos como findAll(), save(), deleteById()
}
