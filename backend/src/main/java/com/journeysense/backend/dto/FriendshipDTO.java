package com.journeysense.backend.dto;

import com.journeysense.backend.model.Friendship;
import java.time.LocalDateTime;
import java.util.UUID;

public record FriendshipDTO(
    UUID id,
    UUID requesterId,
    String requesterUsername,
    UUID addresseeId,
    String addresseeUsername,
    Friendship.FriendshipStatus status,
    LocalDateTime createdAt
) {}
