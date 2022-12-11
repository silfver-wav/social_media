package com.example.socialmediaserver.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FollowingServiceTest {

    @InjectMocks
    FollowingService followingService;

    @Mock
    FollowingRepository followingRepository;

    @Mock
    UserRepository userRepository;

    @Test
    void followUser() {
        User user = new User(UUID.randomUUID(), "Linus", "Silfver", "pwd", "linus.silfver@gmail.com", "limpan");
        User u2f = new User(UUID.randomUUID(), "Victor", "Pero", "pwd", "victor.pero@gmail.com", "Pero");

        Set<User> users = new HashSet<>();
        users.add(u2f);
        Following following = new Following(UUID.randomUUID(),"limpan",users);

        when(userRepository.findByUserName("limpan")).thenReturn(Optional.of(user));
        when(userRepository.findByUserName("Pero")).thenReturn(Optional.of(u2f));

        when(followingRepository.findByUser("limpan")).thenReturn(Optional.of(following));


        //when(followingRepository.save(following)).thenReturn()

        ResponseEntity<Object> rs = followingService.followUser(u2f.getUserName(),user.getUserName());

        Assertions.assertEquals(rs, ResponseHandler.generateResponse(HttpStatus.OK, "limpan is now following Pero"));

        verify(followingRepository,times(1)).save(following);
    }

    @Test
    void getAllFriends() {
        User user = new User(UUID.randomUUID(), "Linus", "Silfver", "pwd", "linus.silfver@gmail.com", "limpan");
        User u2f = new User(UUID.randomUUID(), "Victor", "Pero", "pwd", "victor.pero@gmail.com", "Pero");

        Set<User> users = new HashSet<>();
        users.add(u2f);
        Following following = new Following(UUID.randomUUID(),"limpan",users);

        when(followingRepository.findByUser(user.getUserName())).thenReturn(Optional.of(following));

        ResponseEntity<Object> rs = followingService.getAllFriends(user.getUserName());

        Assertions.assertEquals(rs, ResponseHandler.generateResponse(HttpStatus.OK, "People "+user.getUserName()+" is following", following.getUsers()));
    }
}