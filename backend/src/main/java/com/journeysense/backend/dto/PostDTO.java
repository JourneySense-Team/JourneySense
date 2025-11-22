package com.journeysense.backend.dto;

import com.journeysense.backend.model.Post;
import com.journeysense.backend.model.TagType;
import java.time.LocalDateTime;
import java.util.UUID;

public record PostDTO(
    UUID id,
    String title,
    String description,
    Post.PostType type,
    TagType tag,
    String fileUrl,
    LocalDateTime createdAt,
    boolean isTeacherEndorsed,
    UUID userId,
    String username,
    UUID hubId,
    int numberOfComments
) {}
