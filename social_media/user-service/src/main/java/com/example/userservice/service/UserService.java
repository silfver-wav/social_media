package com.example.userservice.service;

import com.example.userservice.interfaces.IUserService;
import com.example.userservice.model.User;
import com.example.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

/**
 * Service class for user.
 */
@Service
@RequiredArgsConstructor
public class UserService implements IUserService{
    private final UserRepository userRepository;

    /**
     * Create a new user and adds it to the database.
     * @param user User body
     * @return HTTP status CREATED if succeeded, otherwise HTTP status BAD_REQUEST.
     */
    @Override
    public ResponseEntity<Object> createUser(User user) {
        try {
            if (user.getEmail() == null || user.getFirstName() == null || user.getLastName() == null || user.getPwd() == null)
                return ResponseHandler.generateResponse(HttpStatus.BAD_REQUEST, "All fields required");

            userRepository.save(user);
            return ResponseHandler.generateResponse(HttpStatus.CREATED, "Successfully created user");
        } catch (IllegalArgumentException ex) {
            System.out.println(ex.getMessage());
            return ResponseHandler.generateResponse(HttpStatus.BAD_REQUEST, "No user provided");
        }
    }


    /**
     * Verifies login data with the database.
     * @param user User body
     * @return HTTP status OK if correct, otherwise HTTP status BAD_REQUEST.
     */
    public ResponseEntity<Object> login(User user) {
        Optional<User> rs = userRepository.findByUserName(user.getUserName());
        if (rs.isEmpty())
        {
            System.out.println("error");
            return ResponseHandler.generateResponse(HttpStatus.BAD_REQUEST, "Email not valid");
        }

        User u = rs.get();
        if (!u.getPwd().equals(user.getPwd()))
            return ResponseHandler.generateResponse(HttpStatus.BAD_REQUEST, "Wrong password");


        return ResponseHandler.generateResponse(HttpStatus.OK, "Ok");
    }

    /**
     * Gets user data by user from the database.
     * @param username
     * @return HTTP status OK if correct, otherwise HTTP status BAD_REQUEST.
     */
    @Override
    public ResponseEntity<Object> get(String username) {
        System.out.println("username: "+username);
        Optional<User> rs = userRepository.findByUserName(username);
        if (rs.isEmpty())
        {
            System.out.println("error");
            return ResponseHandler.generateResponse(HttpStatus.BAD_REQUEST, "User does not exist");
        }

        System.out.println(rs.get().toString());
        return ResponseHandler.generateResponse(HttpStatus.OK, "Ok", rs.get());
    }


    /**
     * Gets all users except for specified user from the database.
     * @param username
     * @return HTTP status OK if correct, otherwise HTTP status BAD_REQUEST.
     */
    @Override
    public ResponseEntity<Object> getAll(String username) {
        Iterator<User> rs = userRepository.findAll().iterator();

        List<User> users = new ArrayList<>();
        while (rs.hasNext()) {
            User user = rs.next();
            if (!user.getUserName().equals(username))
                users.add(user);
        }

        if (users.isEmpty())
        {
            System.out.println("error");
            return ResponseHandler.generateResponse(HttpStatus.BAD_REQUEST, "No users exists");
        }

        return ResponseHandler.generateResponse(HttpStatus.OK, "Ok", users);
    }
}

