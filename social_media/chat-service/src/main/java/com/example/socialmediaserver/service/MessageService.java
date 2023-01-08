package com.example.socialmediaserver.service;

import com.example.socialmediaserver.interfaces.IMessageService;
import com.example.socialmediaserver.model.Message;
import com.example.socialmediaserver.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.*;

/**
 * Service class for message.
 */
@Service
@RequiredArgsConstructor
public class MessageService implements IMessageService {

    private final MessageRepository messageRepository;

    /**
     * Create a new message and saves it in the database
     * @param msg Message body
     * @return HTTP status CREATED if succeeded, otherwise HTTP status BAD_REQUEST.
     */
    @Override
    public ResponseEntity<Object> saveMessage(Message msg) {
        try {
            if (msg.getText() == null || msg.getReceiver() == null || msg.getSender() == null)
                return ResponseHandler.generateResponse(HttpStatus.BAD_REQUEST, "All fields required");

            msg.setTimeStamp(LocalDateTime.now());
            messageRepository.save(msg);
            return ResponseHandler.generateResponse(HttpStatus.CREATED, "Successfully created sent message");
        } catch (IllegalArgumentException ex) {
            System.out.println(ex.getMessage());
            return ResponseHandler.generateResponse(HttpStatus.BAD_REQUEST, "No user provided");
        }
    }

    /**
     * Gets all messages for a specific chat from the database.
     * @param sender
     * @param receiver
     * @return HTTP status OK if succeeded, otherwise HTTP status BAD_REQUEST.
     */
    @Override
    public ResponseEntity<Object> getMessages(String sender, String receiver) {
        Iterable<Message> rs = messageRepository.findAllBySenderAndReceiver(sender, receiver);
        Iterable<Message> rs2 = messageRepository.findAllBySenderAndReceiver(receiver, sender);

        List<Message> messages = new ArrayList<>();
        if (rs.iterator().hasNext()) {
            System.out.println("here");
            Iterator<Message> it = rs.iterator();
            while (it.hasNext()) {
                messages.add(it.next());
            }
            System.out.println(messages.toString());
        }
        if (rs2.iterator().hasNext()) {
            System.out.println("here");
            Iterator<Message> it = rs2.iterator();
            while (it.hasNext()) {
                messages.add(it.next());
            }
            System.out.println(messages.toString());
        }

        Collections.sort(messages);

        return ResponseHandler.generateResponse(HttpStatus.OK, "Ok", messages);
    }
}
