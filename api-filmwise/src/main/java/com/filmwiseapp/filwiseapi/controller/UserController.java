package com.filmwiseapp.filwiseapi.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import com.filmwiseapp.filwiseapi.dao.UserRepository;
import com.filmwiseapp.filwiseapi.dto.*;
import com.filmwiseapp.filwiseapi.model.User;
import com.filmwiseapp.filwiseapi.utils.JwtUtil;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*") //permite a React llamar a la api
public class UserController {

    private final UserRepository repo;

    public UserController(UserRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<User> getUsers() {
        return repo.findAll();
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

        user.setRol("REGISTRADO");
        repo.createUser(user);

        return "Correcto"; //en verdad si es correcto no se llega a usar
    }

    @PostMapping("/getUser")
    public User getUser(@RequestHeader("Authorization") String authentication, @RequestBody NameRequest nameRequest) {
        
        String token = authentication.replace("Bearer ", "");
        if (!JwtUtil.validateToken(token, "REGISTRADO") && !JwtUtil.validateToken(token, "ADMIN")) {
            System.out.println("************ TOKEN INVALIDO ************");
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        return repo.findByName(nameRequest.getName());
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {
        
        User user = repo.findByEmail(loginRequest.getEmail());

        if (user == null) {
            return new LoginResponse(false, "Usuario no registrado");
        }
        
        //Si lo ha encontrado pero la contraseña no coincide con la del loginRequest
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return new LoginResponse(false, "Contraseña incorrecta");
        }

        String token = JwtUtil.generateToken(user);

        return new LoginResponse(true, "Login correcto", token, user.getName(), user.getRol());
    }

    @PostMapping("/friends/number")
    public String getNumberOfFriends(@RequestBody NameRequest nameRequest){
        return repo.findNumberOfFriends(nameRequest.getName());
    }

    @PostMapping("/edit/name")
    public void editUserName(@RequestBody EditName editName){
        repo.editName(editName.getOldName(), editName.getNewName());
    }

    @PostMapping("/edit/email")
    public void editUserEmail(@RequestBody EditEmail editEmail){
        repo.editEmail(editEmail.getOldEmail(), editEmail.getNewEmail());
    }

    @PostMapping("/edit/image")
    public void editUserImage(@RequestBody EditImage editImage){
        repo.editImage(editImage.getName(), editImage.getNewImage());
    }

    @PostMapping("/missions")
    public List<MissionResponse> getUserMissions(@RequestBody NameRequest nameRequest){
        return repo.findUserMissions(nameRequest.getName());
    }

    //sumamos al score actual del usuario el scoreIncrease cuando se termina una partida
    @PostMapping("/edit/score")
    public void editUserScore(@RequestBody EditNumber editScore){
        repo.editScore(editScore.getName(), editScore.getNumber());
    }

    @PostMapping("/edit/level")
    public void editUserLevel(@RequestBody NameRequest nameRequest){
        repo.editLevel(nameRequest.getName());
    }

    @PostMapping("/edit/correctAnswers")
    public void editUserCorrectAnswers(@RequestBody EditNumber editCorrectAnswers){
        repo.editCorrectAnswers(editCorrectAnswers.getName(), editCorrectAnswers.getNumber());
    }

    @PostMapping("/edit/bestScore")
    public void editBestScore(@RequestBody EditNumber editBestScore){
        repo.editBestScore(editBestScore.getName(), editBestScore.getNumber());
    }

    @PostMapping("/friends/messages")
    public List<MessageResponse> getUserMessages(@RequestBody NameRequest nameRequest){
        return repo.findUserMessages(nameRequest.getName());
    }

    @PostMapping("/friends/newMessage")
    public String sendMessage(@RequestBody MessageRequest friendsRequest){
        return repo.createMessage(friendsRequest.getEmisorName(), friendsRequest.getReceptorName());
    }

    @PostMapping("/friends/editStatus")
    public void editMessageStatus(@RequestBody EditMessageStatus editMessageStatus){
        repo.editStatusMessage(editMessageStatus.getNameEmisor(), editMessageStatus.getNameReceptor(), editMessageStatus.getNewStatus());
    }

    @GetMapping("/rankingUsers")
    public List<User> getRankingUsers(){
        return repo.getRankingUsers();
    }

    @PostMapping("/challenges/messages")
    public List<MessageResponse> getUserChallengeMessages(@RequestBody NameRequest nameRequest){
        return repo.findUserChallengeMessages(nameRequest.getName());
    }

    @PostMapping("/challenges/newMessage")
    public String sendChallengeMessage(@RequestBody MessageRequest challengesRequest){
        return repo.createChallengeMessage(challengesRequest.getEmisorName(), challengesRequest.getReceptorName(), challengesRequest.getFilmTitle());
    }

    @PostMapping("/challenges/editStatus")
    public void editChallengeStatus(@RequestBody EditMessageStatus editMessageStatus){
        repo.editStatusChallengeMessage(editMessageStatus.getNameEmisor(), editMessageStatus.getNameReceptor(), editMessageStatus.getNewStatus());
    }

    @PostMapping("/deleteUser")
    public void deleteUser(@RequestBody NameRequest nameRequest){
        repo.deleteUser(nameRequest.getName());
    }

    @PostMapping("/updateUser")
    public void updateUser(@RequestBody User user){
        repo.updateUser(user);
    }
}   
