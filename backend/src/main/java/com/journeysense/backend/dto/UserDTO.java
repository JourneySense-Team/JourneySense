package com.journeysense.backend.dto;

import com.journeysense.backend.model.User;
import java.util.UUID;

public record UserDTO(
    UUID id,
    String firstName,
    String lastName,
    String password,
    String username,
    String email,
    int level,
    int experience,
    User.Role role
) {}
