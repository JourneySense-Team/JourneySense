package com.journeysense.backend.dto;

import com.journeysense.backend.model.User;

public record RegisterRequestDTO(
        String firstName,
        String lastName,
        String username,
        String email,
        String password,
        User.Role role
) {}