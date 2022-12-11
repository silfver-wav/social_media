package com.example.socialmediaserver.controller;

import com.example.socialmediaserver.interfaces.IMessageService;
import com.example.socialmediaserver.model.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.messaging.simp.SimpMessagingTemplate;

/**
 * Rest API and websocket for message.
 */
@RestController
@RequiredArgsConstructor
public class ChatSocket {
    private final IMessageService messageService;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    /*
    @MessageMapping("/sendPhoto")
    @SendTo({"/topic/photo"})
    public MultipartFile sendPhoto(@Payload MultipartFile file) {
        //System.out.println("file: "+file.getOriginalFilename());
        return file;
    }com.app.chatservice
     */

    /**
     * Socket for public chat and post endpoint for message.
     * @param message Message body
     * @return message to all subscribed to socket.
     */
    @MessageMapping("/sendMessage")
    @SendTo("/topic/public")
    @RequestMapping(consumes = {"multipart/form-data"})
    public Message sendMessage(@Payload Message message) {
        messageService.saveMessage(message);
        return message;
    }

    /**
     * Socket for private chat and post endpoint for message.
     * @param message Message body
     * @return message to receiver.
     */
    @MessageMapping("/private-message")
    public Message recMessage(@Payload Message message){
        simpMessagingTemplate.convertAndSendToUser(message.getReceiver(),"/private",message);
        System.out.println(message.toString());
        messageService.saveMessage(message);
        return message;
    }

}
