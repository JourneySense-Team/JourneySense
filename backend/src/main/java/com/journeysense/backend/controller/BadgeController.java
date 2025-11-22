package com.journeysense.backend.controller;

import com.journeysense.backend.dto.BadgeDTO;
import com.journeysense.backend.service.BadgeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/badges")
public class BadgeController {

    private final BadgeService badgeService;

    @GetMapping
    public ResponseEntity<List<BadgeDTO>> getAllBadges() {
        return ResponseEntity.ok(badgeService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BadgeDTO> getBadgeById(@PathVariable UUID id) {
        BadgeDTO badge = badgeService.findById(id);
        if (badge == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(badge);
    }

    @PostMapping
    public ResponseEntity<BadgeDTO> createBadge(@RequestBody BadgeDTO badgeDTO) {
        return ResponseEntity.ok(badgeService.create(badgeDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BadgeDTO> updateBadge(@PathVariable UUID id, @RequestBody BadgeDTO badgeDTO) {
        return ResponseEntity.ok(badgeService.update(id, badgeDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBadge(@PathVariable UUID id) {
        badgeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
