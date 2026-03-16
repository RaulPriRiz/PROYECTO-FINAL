package com.filmwiseapp.filwiseapi;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users") //el endopoint o url
@CrossOrigin(origins = "*") //permite a React llamar a la api
public class UserController {

    private final UserRepository repo;

    public UserController(UserRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return repo.save(user);
    }
  
    public List<User> getUsers() {
        return repo.findAll();
    }



  ççç

}
