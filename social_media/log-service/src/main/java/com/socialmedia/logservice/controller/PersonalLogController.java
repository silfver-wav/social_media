package com.socialmedia.logservice.controller;

import com.socialmedia.logservice.interfaces.IPersonalLogService;
import com.socialmedia.logservice.model.PersonalLog;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Rest API for personal log.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/personal_log")
public class PersonalLogController {
    private final IPersonalLogService personalLogService;

    /**
     * Getter endpoint for personal logs by user.
     * @param username
     * @return HTTP status OK if found, otherwise HTTP status BAD_REQUEST or NOT_FOUND.
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/{username}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> get(@PathVariable("username") String username) {
        System.out.println("username1: "+username);
        return personalLogService.getAllByUser(username);
    }

    /**
     * Getter endpoint for the personal logs of users that user is following.
     * @param username
     * @return HTTP status OK if found, otherwise HTTP status BAD_REQUEST or NOT_FOUND.
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "dash/{username}")
    public ResponseEntity<Object> getDash(@PathVariable("username") String username) {
        System.out.println("Dash");
        System.out.println("username: "+username);
        return personalLogService.getDash(username);
    }

    /**
     * Post endpoint to create a personal log.
     * @param personalLog PersonalLog body
     * @return HTTP status CREATED if succeeded, otherwise HTTP status BAD_REQUEST.
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, path = "/add")
    public ResponseEntity<Object> add(@RequestBody PersonalLog personalLog) {
        System.out.println("username: "+personalLog.getUserName());
        return personalLogService.create(personalLog);
    }

}
