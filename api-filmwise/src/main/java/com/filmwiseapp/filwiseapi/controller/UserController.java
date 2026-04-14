package com.filmwiseapp.filwiseapi.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.filmwiseapp.filwiseapi.dao.UserRepository;
import com.filmwiseapp.filwiseapi.dto.EditEmail;
import com.filmwiseapp.filwiseapi.dto.EditImage;
import com.filmwiseapp.filwiseapi.dto.EditName;
import com.filmwiseapp.filwiseapi.dto.LoginResponse;
import com.filmwiseapp.filwiseapi.dto.MissionResponse;
import com.filmwiseapp.filwiseapi.dto.NameRequest;
import com.filmwiseapp.filwiseapi.model.User;
import com.filmwiseapp.filwiseapi.utils.JwtUtil;
import com.filmwiseapp.filwiseapi.dto.LoginRequest;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*") //permite a React llamar a la api
public class UserController {

    private final UserRepository repo;

    public UserController(UserRepository repo) {
        this.repo = repo;
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {

        User existingEmail = repo.findByEmail(user.getEmail());

        User existingName = repo.findByName(user.getName());

        if (existingEmail != null) {
            return "Ese correo ya existe";
        }
        if (existingName != null) {
            return "Ese nombre ya existe";
        }

        repo.create(user);

        return "Correcto";
    }

    @PostMapping
    public User getUser(@RequestHeader("Authorization") String authentication, @RequestBody NameRequest nameRequest) {
        
        String token = authentication.replace("Bearer ", "");
        System.out.println("**********************************");
        System.out.println("token: " + token);
        if (!JwtUtil.validateToken(token, "REGISTRADO")) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Token inválido o sin permisos");
        }

        return repo.findByName(nameRequest.getName());
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {
        
        User user = repo.findByEmail(loginRequest.getEmail());

        if (user == null) {
            return new LoginResponse(false, "Usuario no registrado", null, null, null);
        }
        
        System.out.println(loginRequest.getPassword());
        //Si lo ha encontrado pero la contraseña no coincide con la del loginRequest
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return new LoginResponse(false, "Contraseña incorrecta", null, null, null);
        }

        String token = JwtUtil.generateToken(user);

        return new LoginResponse(true, "Login correcto", token, user.getName(), user.getRol());
    }

    @PostMapping("/friends/number")
    public String getNumberOfFriends(@RequestBody NameRequest nameRequest){
        return repo.findNumberOfFriends(nameRequest.getName());
    }

    @PostMapping("/edit/name")
    public String editUserName(@RequestBody EditName editName){
        return repo.editName(editName.getOldName(), editName.getNewName());
    }

    @PostMapping("/edit/email")
    public String editUserEmail(@RequestBody EditEmail editEmail){
        return repo.editEmail(editEmail.getOldEmail(), editEmail.getNewEmail());
    }

    @PostMapping("/edit/image")
    public String editUserImage(@RequestBody EditImage editImage){
        return repo.editImage(editImage.getName(), editImage.getNewImage());
    }

    @PostMapping("/missions")
    public List<MissionResponse> getUserMissions(@RequestBody NameRequest nameRequest){
        return repo.findUserMissions(nameRequest.getName());
    }
}
