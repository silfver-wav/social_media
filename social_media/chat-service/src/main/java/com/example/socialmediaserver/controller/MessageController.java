package com.example.socialmediaserver.controller;

import com.example.socialmediaserver.interfaces.IMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Rest API for message.
 */
@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/message", consumes = {MediaType.APPLICATION_JSON_VALUE})
public class MessageController {

    @Autowired
    private DiscoveryClient discoveryClient;
    private final IMessageService messageService;

    /**
     * Getter endpoint for all the messages in a chat.
     * @param sender
     * @param receiver
     * @return HTTP status OK if found, otherwise HTTP status BAD_REQUEST or NOT_FOUND.
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/{sender}/{receiver}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> get(@PathVariable("sender") String sender, @PathVariable("receiver") String receiver ) {

        System.out.println("sender: "+sender);
        System.out.println("receiver: "+ receiver);
        return messageService.getMessages(sender, receiver);
    }
}
