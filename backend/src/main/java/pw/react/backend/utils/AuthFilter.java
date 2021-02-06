package pw.react.backend.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pw.react.backend.dao.UserRepository;

@Component
public class AuthFilter {
    private UserRepository repository;
    public AuthFilter(UserRepository repository){
        this.repository = repository;
    }

    public boolean IsInvalidToken(String token) {
        if (repository.findBySecurityToken(token).isEmpty() == false)
            return false;
        return true;
    }
}
