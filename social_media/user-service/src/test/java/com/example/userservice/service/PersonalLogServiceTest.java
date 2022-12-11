package com.example.userservice.service;

import com.example.userservice.model.Following;
import com.example.userservice.model.User;
import com.example.userservice.repository.FollowingRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.*;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PersonalLogServiceTest {

    @InjectMocks
    private PersonalLogService personalLogService;

    @Mock
    private PersonalLogRepository personalLogRepository;

    @Mock
    private FollowingRepository followingRepository;

    @Test
    void create() {
        PersonalLog personalLog = new PersonalLog(UUID.randomUUID(), "hello world", "username", LocalDateTime.now());

        ResponseEntity<Object> rs = personalLogService.create(personalLog);

        Assertions.assertEquals(rs, ResponseHandler.generateResponse(HttpStatus.CREATED, "Successfully created personal log"));

        verify(personalLogRepository,times(1)).save(personalLog);
    }

    @Test
    void getAllByUser() {
        List<PersonalLog> logs = new ArrayList<>();
        logs.add(new PersonalLog(UUID.randomUUID(), "hello world", "username", LocalDateTime.now()));
        BDDMockito.given(personalLogRepository.findAllByUserName("username")).willReturn(logs);

        ResponseEntity<Object> rs = personalLogService.getAllByUser("username");
        Assertions.assertEquals(rs,ResponseHandler.generateResponse(HttpStatus.OK,  "Ok", logs));
        verify(personalLogRepository).findAllByUserName("username");
    }

    @Test
    void getDash() {
        List<PersonalLog> logs = new ArrayList<>();
        logs.add(new PersonalLog(UUID.randomUUID(), "hello world", "limpan", LocalDateTime.now()));

        Set<User> users = new HashSet<>();
        users.add(new User(UUID.randomUUID(), "Linus", "Silfver", "pwd", "linus.silfver@gmail.com", "limpan"));
        Following following = new Following(UUID.randomUUID(),"username",users);


        BDDMockito.given(followingRepository.findByUser("username")).willReturn(Optional.of(following));

        BDDMockito.given(personalLogRepository.findAllByUserName("limpan")).willReturn(logs);

        ResponseEntity<Object> rs = personalLogService.getDash("username");
        Assertions.assertEquals(rs,ResponseHandler.generateResponse(HttpStatus.OK, "logs found",logs));
    }
}