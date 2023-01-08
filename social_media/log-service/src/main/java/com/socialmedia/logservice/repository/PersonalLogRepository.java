package com.socialmedia.logservice.repository;

import com.socialmedia.logservice.model.PersonalLog;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

/**
 * Repository interface for personal log relation in the database.
 */
public interface PersonalLogRepository extends CrudRepository<PersonalLog, UUID> {
    Iterable<PersonalLog> findAllByUserName(String userName);
}
