package com.socialmedia.logservice.interfaces;

import com.socialmedia.logservice.model.PersonalLog;
import org.springframework.http.ResponseEntity;

/**
 * Service Interface for personal log.
 */
public interface IPersonalLogService {
    ResponseEntity<Object> create(PersonalLog personal_log);

    ResponseEntity<Object> getAllByUser(String username);

    ResponseEntity<Object> getDash(String username);

}
