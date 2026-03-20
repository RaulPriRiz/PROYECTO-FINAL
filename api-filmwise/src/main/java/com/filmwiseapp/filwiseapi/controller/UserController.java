package com.filmwiseapp.filwiseapi.controller;

import org.springframework.web.bind.annotation.*;

import com.filmwiseapp.filwiseapi.dao.UserRepository;
import com.filmwiseapp.filwiseapi.model.User;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*") //permite a React llamar a la api
public class UserController {

    private final UserRepository repo;

    public UserController(UserRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return repo.create(user);
    }
  
    @GetMapping
    public List<User> getUsers() {
        return repo.findAll();
    }

    

  

}
