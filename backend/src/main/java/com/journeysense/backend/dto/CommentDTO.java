package com.journeysense.backend.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record CommentDTO(
    UUID id,
    String text,
    UUID authorId,
    String authorUsername,
    UUID postId,
    LocalDateTime createdAt
) {}
