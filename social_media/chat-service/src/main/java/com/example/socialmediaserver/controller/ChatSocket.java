package com.example.socialmediaserver.controller;

import com.example.socialmediaserver.interfaces.IMessageService;
import com.example.socialmediaserver.model.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
public class ChatSocket {
    private final IMessageService messageService;
    @Autowired
    private KafkaTemplate<String, Message> kafkaTemplate;

    @KafkaListener(topics = "sendMessage", groupId = "group_id")
    @RequestMapping(consumes = {"multipart/form-data"})
    public void sendMessage(Message message) {
        messageService.saveMessage(message);
        kafkaTemplate.send("/topic/public", message);
    }

    @KafkaListener(topics = "private-message", groupId = "group_id")
    public void recMessage(Message message) {
        Message msg = message;
        kafkaTemplate.send(message.getReceiver(),"/private", msg);
        System.out.println(message.toString());
        messageService.saveMessage(message);
    }
}
