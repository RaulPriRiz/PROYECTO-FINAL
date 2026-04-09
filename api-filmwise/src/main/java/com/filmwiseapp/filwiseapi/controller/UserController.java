package com.filmwiseapp.filwiseapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.filmwiseapp.filwiseapi.dao.UserRepository;
import com.filmwiseapp.filwiseapi.model.User;
import com.filmwiseapp.filwiseapi.utils.JwtUtil;
import com.filmwiseapp.filwiseapi.model.LoginRequest;
import com.filmwiseapp.filwiseapi.model.LoginResponse;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*") //permite a React llamar a la api
public class UserController {

    private final UserRepository repo;

    public UserController(UserRepository repo) {
        this.repo = repo;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        User existingUser = repo.findByEmailName(user.getEmail(), user.getName());

        if (existingUser != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Usuario ya existe");
        }

        User created = repo.create(user);

        return ResponseEntity.ok(created);
    }

    @GetMapping
    public List<User> getUsers() {
        return repo.findAll();
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {

        User user = repo.findByEmail(loginRequest.getEmail());

        if (user == null) {
            return new LoginResponse(false, "Usuario no registrado", null, null, null);
        }
        
        //Si  lo ha encontrado pero la contraseña no coincide con la del loginRequest
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
