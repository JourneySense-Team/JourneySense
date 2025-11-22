package com.journeysense.backend.dto;

import com.journeysense.backend.model.User;
import java.util.UUID;

public record AuthResponseDTO(
        String token,
        UUID userId,
        String username,
        String email,
        User.Role role
) {}