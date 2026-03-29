package com.filmwiseapp.filwiseapi.controller;

import org.springframework.web.bind.annotation.*;
import com.filmwiseapp.filwiseapi.dao.UserRepository;
import com.filmwiseapp.filwiseapi.model.User;
import com.filmwiseapp.filwiseapi.utils.JwtUtil;
import com.filmwiseapp.filwiseapi.model.LoginRequest;
import com.filmwiseapp.filwiseapi.model.LoginResponse;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*") // permite a React llamar a la api
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

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {

        User user = repo.findByEmail(loginRequest.getEmail());

        if (user == null) {
            return new LoginResponse(false, "Usuario no encontrado", null, null, null);
        }

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return new LoginResponse(false, "Contraseña incorrecta", null, null, null);
        }

        String token = JwtUtil.generateToken(user);

        return new LoginResponse(
                true,
                "Login correcto",
                token,
                user.getName(),
                user.getRol());
    }

}
