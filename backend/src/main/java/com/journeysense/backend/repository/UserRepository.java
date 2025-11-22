package com.journeysense.backend.repository;

import com.journeysense.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);

    // This tells Spring Data to generate "SELECT * FROM users WHERE username = ?"
    Optional<User> findByUsername(String username);
}
