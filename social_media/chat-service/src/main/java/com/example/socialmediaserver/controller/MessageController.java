package com.example.socialmediaserver.controller;

import com.example.socialmediaserver.interfaces.IMessageService;
import com.example.socialmediaserver.model.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.concurrent.ExecutionException;

/**
 * Rest API for message.
 */
@RestController
public class MessageController {

    //@Autowired
    //private final IMessageService messageService;

    @Autowired
    private KafkaTemplate<String, Message> kafkaTemplate;


    /*
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/{sender}/{receiver}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> get(@PathVariable("sender") String sender, @PathVariable("receiver") String receiver ) {

        System.out.println("sender: "+sender);
        System.out.println("receiver: "+ receiver);
        return messageService.getMessages(sender, receiver);
    }
    */

    @PostMapping(value = "/api/send", consumes = "application/json", produces = "application/json")
    public void sendMessage(@RequestBody Message message) {
        message.setTimeStamp(LocalDateTime.now());
        try {
            //Sending the message to kafka topic queue
            kafkaTemplate.send("private-message", message).get();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }
}
