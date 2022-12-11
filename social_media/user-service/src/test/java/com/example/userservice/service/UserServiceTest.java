package com.example.userservice.service;

import com.example.userservice.model.User;
import com.example.userservice.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Test
    void createUser() {
        User user = new User(UUID.randomUUID(), "Linus", "Silfver", "pwd", "linus.silfver@gmail.com", "limpan");

        ResponseEntity<Object> rs = userService.createUser(user);

        Assertions.assertEquals(rs, ResponseHandler.generateResponse(HttpStatus.CREATED, "Successfully created user"));

        verify(userRepository,times(1)).save(user);
    }

    @Test
    void login() {
        User user = new User(UUID.randomUUID(), "Linus", "Silfver", "pwd", "linus.silfver@gmail.com", "limpan");

        when(userRepository.findByUserName(user.getUserName())).thenReturn(Optional.of(user));

        ResponseEntity<Object> rs = userService.login(user);

        Assertions.assertEquals(rs, ResponseHandler.generateResponse(HttpStatus.OK, "Ok"));

        verify(userRepository).findByUserName(user.getUserName());
    }

    @Test
    void get() {
        User user = new User(UUID.randomUUID(), "Linus", "Silfver", "pwd", "linus.silfver@gmail.com", "limpan");

        when(userRepository.findByUserName(user.getUserName())).thenReturn(Optional.of(user));

        ResponseEntity<Object> rs = userService.get(user.getUserName());

        Assertions.assertEquals(rs, ResponseHandler.generateResponse(HttpStatus.OK, "Ok", user));

        verify(userRepository).findByUserName(user.getUserName());
    }

    @Test
    void getAll() {
        List<User> users = new ArrayList<>();
        users.add(new User(UUID.randomUUID(), "Linus", "Silfver", "pwd", "linus.silfver@gmail.com", "limpan"));
        BDDMockito.given(userRepository.findAll()).willReturn(users);

        ResponseEntity<Object> rs = userService.getAll("username");
        Assertions.assertEquals(rs,ResponseHandler.generateResponse(HttpStatus.OK,  "Ok", users));
        verify(userRepository).findAll();
    }
}