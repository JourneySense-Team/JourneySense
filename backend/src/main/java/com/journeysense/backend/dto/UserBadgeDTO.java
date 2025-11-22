package com.journeysense.backend.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record UserBadgeDTO(
    UUID id,
    UUID userId,
    UUID badgeId,
    LocalDateTime dateAcquired
) {}
