package com.journeysense.backend.service;

import com.journeysense.backend.dto.BadgeDTO;
import com.journeysense.backend.model.Badge;
import com.journeysense.backend.repository.BadgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BadgeService {

    private final BadgeRepository badgeRepository;

    @Transactional(readOnly = true)
    public List<BadgeDTO> getAll() {
        return badgeRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public BadgeDTO findById(UUID id) {
        return badgeRepository.findById(id).map(this::toDTO).orElse(null);
    }

    @Transactional
    public BadgeDTO create(BadgeDTO badgeDTO) {
        Badge badge = new Badge();
        badge.setTitle(badgeDTO.title());
        badge.setDescription(badgeDTO.description());
        badge.setRewardExperience(badgeDTO.rewardExperience());
        return toDTO(badgeRepository.save(badge));
    }

    @Transactional
    public BadgeDTO update(UUID id, BadgeDTO badgeDTO) {
        Badge badge = badgeRepository.findById(id).orElseThrow(() -> new RuntimeException("Badge not found"));
        badge.setTitle(badgeDTO.title());
        badge.setDescription(badgeDTO.description());
        badge.setRewardExperience(badgeDTO.rewardExperience());
        return toDTO(badgeRepository.save(badge));
    }

    @Transactional
    public void delete(UUID id) {
        badgeRepository.deleteById(id);
    }

    private BadgeDTO toDTO(Badge badge) {
        return new BadgeDTO(badge.getId(), badge.getTitle(), badge.getDescription(), badge.getRewardExperience());
    }
}
