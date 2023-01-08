package com.example.userservice.repository;

import com.example.userservice.model.User;
import org.springframework.data.repository.CrudRepository;
import java.util.Optional;
import java.util.UUID;

/**
 * Repository interface for user relation in the database.
 */
public interface UserRepository extends CrudRepository<User, UUID> {
    Optional<User> findByUserName(String userName);

}
