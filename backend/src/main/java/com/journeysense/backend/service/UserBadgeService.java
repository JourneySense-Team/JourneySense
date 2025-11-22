package com.journeysense.backend.service;

import com.journeysense.backend.dto.UserBadgeDTO;
import com.journeysense.backend.model.Badge;
import com.journeysense.backend.model.User;
import com.journeysense.backend.model.UserBadge;
import com.journeysense.backend.repository.BadgeRepository;
import com.journeysense.backend.repository.UserBadgeRepository;
import com.journeysense.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserBadgeService {

    private final UserBadgeRepository userBadgeRepository;
    private final UserRepository userRepository;
    private final BadgeRepository badgeRepository;

    @Transactional(readOnly = true)
    public List<UserBadgeDTO> getAll() {
        return userBadgeRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserBadgeDTO findById(UUID id) {
        return userBadgeRepository.findById(id).map(this::toDTO).orElse(null);
    }

    @Transactional
    public UserBadgeDTO create(UserBadgeDTO userBadgeDTO) {
        UserBadge userBadge = new UserBadge();
        User user = userRepository.findById(userBadgeDTO.userId()).orElseThrow(() -> new RuntimeException("User not found"));
        Badge badge = badgeRepository.findById(userBadgeDTO.badgeId()).orElseThrow(() -> new RuntimeException("Badge not found"));

        userBadge.setUser(user);
        userBadge.setBadge(badge);
        return toDTO(userBadgeRepository.save(userBadge));
    }

    @Transactional
    public void delete(UUID id) {
        userBadgeRepository.deleteById(id);
    }

    private UserBadgeDTO toDTO(UserBadge userBadge) {
        return new UserBadgeDTO(
                userBadge.getId(),
                userBadge.getUser().getId(),
                userBadge.getBadge().getId(),
                userBadge.getDateAcquired()
        );
    }
}
