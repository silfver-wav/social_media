package com.socialmedia.logservice.service;

import com.socialmedia.logservice.ValueObject.Following;
import com.socialmedia.logservice.ValueObject.User;
import com.socialmedia.logservice.interfaces.IPersonalLogService;
import lombok.AllArgsConstructor;
import com.socialmedia.logservice.model.PersonalLog;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.socialmedia.logservice.repository.PersonalLogRepository;
import org.springframework.web.client.RestTemplate;
import java.time.LocalDateTime;
import java.util.*;

/**
 * Service class for personal log.
 */
@Service
@AllArgsConstructor
public class PersonalLogService implements IPersonalLogService {
    private final PersonalLogRepository personalLogRepository;
    private RestTemplate restTemplate;

    //private final FollowingRepository followingRepository;

    /**
     * Create a new personal log
     * @param personal_log PersonalLog body
     * @return HTTP status CREATED if succeeded, otherwise HTTP status BAD_REQUEST.
     */
    @Override
    public ResponseEntity<Object> create(PersonalLog personal_log) {
        try {
            if (personal_log.getMsg() == null)
                return ResponseHandler.generateResponse(HttpStatus.BAD_REQUEST, "All fields required");

            personal_log.setDate(LocalDateTime.now());
            personalLogRepository.save(personal_log);
            return ResponseHandler.generateResponse(HttpStatus.CREATED, "Successfully created personal log");
        } catch (IllegalArgumentException ex) {
            System.out.println(ex.getMessage());
            return ResponseHandler.generateResponse(HttpStatus.BAD_REQUEST, "No user provided");
        }
    }

    /**
     * Gets all personal logs by the user from the database.
     * @param username
     * @return HTTP status OK if succeeded, otherwise HTTP status BAD_REQUEST.
     */
    @Override
    public ResponseEntity<Object> getAllByUser(String username) {
        if (username.isEmpty())
            return ResponseHandler.generateResponse(HttpStatus.BAD_REQUEST, "No username provided");


        Iterator<PersonalLog> iterator = personalLogRepository.findAllByUserName(username).iterator();
        List<PersonalLog> personalLogs = new ArrayList<>();

        while (iterator.hasNext())
            personalLogs.add(iterator.next());

        if (personalLogs.size() == 0)
            return ResponseHandler.generateResponse(HttpStatus.OK, "No personal logs found","nothing");

        return ResponseHandler.generateResponse(HttpStatus.OK, "Ok", personalLogs);
    }

    /**
     * Gets all personal logs the users user follows from the database.
     * @param username
     * @return HTTP status OK if succeeded, otherwise HTTP status BAD_REQUEST.
     */
    @Override
    public ResponseEntity<Object> getDash(String username) {
        if (username.isEmpty()) return ResponseHandler.generateResponse(HttpStatus.BAD_REQUEST, "No username provided",new Object());


        HashMap<String, Long> params = new HashMap<>();
        ResponseEntity<Following> rs = restTemplate.getForEntity("http://localhost:8083/user/getFollowing/"+username, Following.class, params);

        if (!rs.hasBody()) return ResponseHandler.generateResponse(HttpStatus.OK, "User is not following anyone",new Object());


        //Optional<Following> rs = followingRepository.findByUser(username);
        //if (rs.isEmpty()) return ResponseHandler.generateResponse(HttpStatus.OK, "User is not following anyone",new Object());


        Iterator<User> it = rs.getBody().getUsers().iterator();
        List<PersonalLog> logs = new ArrayList<>();
        while (it.hasNext()) {
            Iterable<PersonalLog> pl = personalLogRepository.findAllByUserName(it.next().getUserName());
            for (PersonalLog personalLog : pl) {
                logs.add(personalLog);
            }
        }
        Collections.sort(logs);

        return ResponseHandler.generateResponse(HttpStatus.OK, "logs found",logs);

    }
}
