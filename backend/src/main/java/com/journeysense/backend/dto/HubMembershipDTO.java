package com.journeysense.backend.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record HubMembershipDTO(
    UUID id,
    UUID userId,
    UUID hubId,
    LocalDateTime joinDate
) {}
