package com.example.userservice.interfaces;

import com.example.userservice.model.User;
import org.springframework.http.ResponseEntity;

/**
 * Service Interface for user.
 */
public interface IUserService {
    ResponseEntity<Object> createUser(User user);

    ResponseEntity<Object> login(User user);

    ResponseEntity<Object> get(String username);

    ResponseEntity<Object> getAll(String username);

}
