package com.example.socialmediaserver.service;

import com.example.socialmediaserver.model.Message;
import com.example.socialmediaserver.repository.MessageRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MessageServiceTest {

    @InjectMocks
    private MessageService messageService;

    @Mock
    private MessageRepository messageRepository;

    @Test
    void saveMessage() {
        Message msg = new Message(UUID.randomUUID(), "Hello", null, "limpan", "pero", LocalDateTime.now());

        ResponseEntity<Object> rs = messageService.saveMessage(msg);

        Assertions.assertEquals(rs, ResponseHandler.generateResponse(HttpStatus.CREATED, "Successfully created sent message"));

        verify(messageRepository,times(1)).save(msg);
    }

    @Test
    void getMessages() {
        List<Message> messages = new ArrayList<>();
        messages.add(new Message(UUID.randomUUID(), "Hello", null, "limpan", "pero", LocalDateTime.now()));

        when(messageRepository.findAllBySenderAndReceiver("limpan","pero")).thenReturn(messages);

        ResponseEntity<Object> rs = messageService.getMessages("limpan", "pero");

        Assertions.assertEquals(rs, ResponseHandler.generateResponse(HttpStatus.OK, "Ok", messages));

        verify(messageRepository).findAllBySenderAndReceiver("limpan", "pero");
    }
}