package com.example.socialmediaserver.config;

import org.springframework.stereotype.Component;
import org.springframework.kafka.annotation.KafkaListener;

@Component
public class KafkaListeners {

    @KafkaListener(topics = "private-message", groupId = "group_id")
    void listen(String message) {
        System.out.println("Received Message in group group_id: " + message);
    }
}
