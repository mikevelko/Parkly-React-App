package pw.react.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pw.react.backend.dao.UserRepository;
import pw.react.backend.model.User;

import java.util.Optional;

@RestController
@RequestMapping(path = "/authorization")
public class AuthorizationController {
    private UserRepository repository;

    @Autowired
    public AuthorizationController(UserRepository repository){
        this.repository = repository;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<String> login(@RequestBody User userLogin){
        Optional<User> user = repository.findByLogin(userLogin.getLogin());
            if(user.isEmpty()){
                return ResponseEntity.badRequest().body(null);
            }
            if(user.get().getPassword().equals(userLogin.getPassword())){
                return ResponseEntity.ok(user.get().getSecurityToken());
            }
            return ResponseEntity.badRequest().body(null);
    }
}
