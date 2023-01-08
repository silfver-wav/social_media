package com.example.userservice.controller;

import com.example.userservice.interfaces.IFollowingService;
import com.example.userservice.interfaces.IUserService;
import com.example.userservice.model.Following;
import com.example.userservice.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.kafka.core.KafkaTemplate;

/**
 * Rest API for user.
 */
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/user")
public class UserController {

    private final IUserService userService;
    private final IFollowingService followingService;
    private final KafkaTemplate<String, String> kafkaTemplate;

    /**
     * Post endpoint to create a new user.
     * @param user User body
     * @return HTTP status CREATED if succeeded, otherwise HTTP status BAD_REQUEST.
     */
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, path = "/add")
    public ResponseEntity<Object> add(@RequestBody User user) {
        ResponseEntity<Object> response = userService.createUser(user);
        if (response.getStatusCode().is2xxSuccessful()) {
            kafkaTemplate.send("new-user", user.getUserName());
        }
        return response;
    }

    /**
     * Post endpoint to login for user.
     * @param user User body
     * @return HTTP status OK if succeeded, otherwise HTTP status BAD_REQUEST.
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, path = "/login")
    public ResponseEntity<Object> login(@RequestBody User user) {
        return userService.login(user);
    }

    /**
     * Get endpoint for user.
     * @param username
     * @return HTTP status OK if succeeded, otherwise HTTP status BAD_REQUEST.
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{username}")
    public ResponseEntity<Object> getUser(@PathVariable("username") String username) {
        System.out.println("username1: "+username);
        return userService.get(username);
    }

    /**
     * Getter endpoint for all users in the database except user with username.
     * @param username
     * @return HTTP status OK and all users if found.
     */
    @GetMapping(value = "getAllUsers/{username}")
    public ResponseEntity<Object> getAllUsers(@PathVariable("username") String username) {
        return userService.getAll(username);
    }

    /**
     * Getter endpoint for all the users user is following.
     * @param username
     * @return HTTP status OK and all users if found.
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "getAllFriends/{username}")
    public ResponseEntity<Object> getAllMyFriends(@PathVariable("username") String username) {
        System.out.println("Get all my friends");
        System.out.println("Username: "+username);
        return followingService.getAllFriends(username);
    }

    /**
     * Post endpoint to follow user.
     * @param user User body
     * @param username User to follow username
     * @return HTTP status OK if succeeded, otherwise HTTP status BAD_REQUEST.
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(method = RequestMethod.POST, value = "follow/{username}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object>  followUser(@PathVariable("username") String username, @RequestBody User user) {
        System.out.println("user to follow: "+username);
        System.out.println("username: "+user.getUserName());
        return followingService.followUser(username, user.getUserName());
    }

    //@CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(method = RequestMethod.GET, value = "getFollowing/{username}")
    public Following getFollowing(@PathVariable("username") String username) {
        System.out.println("getFollow: "+username);

        return followingService.getFollowing(username);
    }
}