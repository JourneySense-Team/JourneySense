package com.journeysense.backend.repository;

import com.journeysense.backend.model.Badge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BadgeRepository extends JpaRepository<Badge, UUID> {
}
