package com.journeysense.backend.dto;

import java.util.UUID;

public record BadgeDTO(
    UUID id,
    String title,
    String description,
    int rewardExperience
) {}
