package com.journeysense.backend.dto;

import java.util.Set;
import java.util.UUID;

public record HubDTO(
    UUID id,
    String name,
    String description,
    boolean isPrivate,
    Set<String> tags,
    int numberOfMembers,
    int numberOfPosts
) {}
