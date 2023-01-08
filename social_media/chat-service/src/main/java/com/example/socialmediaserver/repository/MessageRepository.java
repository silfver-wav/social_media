package com.example.socialmediaserver.repository;

import com.example.socialmediaserver.model.Message;
import org.springframework.data.repository.CrudRepository;
import java.util.UUID;

/**
 * Repository interface for message relation in the database.
 */
public interface MessageRepository extends CrudRepository<Message, UUID> {
    Iterable<Message> findAllBySenderAndReceiver(String sender, String receiver);
}
