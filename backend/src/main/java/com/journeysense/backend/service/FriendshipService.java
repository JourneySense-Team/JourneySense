package com.journeysense.backend.service;

import com.journeysense.backend.dto.FriendshipDTO;
import com.journeysense.backend.model.Friendship;
import com.journeysense.backend.model.User;
import com.journeysense.backend.repository.FriendshipRepository;
import com.journeysense.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FriendshipService {

    private final FriendshipRepository friendshipRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<FriendshipDTO> getAll() {
        return friendshipRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public FriendshipDTO findById(UUID id) {
        return friendshipRepository.findById(id).map(this::toDTO).orElse(null);
    }

    @Transactional
    public FriendshipDTO create(FriendshipDTO friendshipDTO) {
        Friendship friendship = new Friendship();
        User requester = userRepository.findById(friendshipDTO.requesterId()).orElseThrow(() -> new RuntimeException("Requester not found"));
        User addressee = userRepository.findById(friendshipDTO.addresseeId()).orElseThrow(() -> new RuntimeException("Addressee not found"));

        friendship.setRequester(requester);
        friendship.setAddressee(addressee);
        friendship.setStatus(friendshipDTO.status());
        return toDTO(friendshipRepository.save(friendship));
    }

    @Transactional
    public FriendshipDTO update(UUID id, FriendshipDTO friendshipDTO) {
        Friendship friendship = friendshipRepository.findById(id).orElseThrow(() -> new RuntimeException("Friendship not found"));
        friendship.setStatus(friendshipDTO.status());
        return toDTO(friendshipRepository.save(friendship));
    }

    @Transactional
    public void delete(UUID id) {
        friendshipRepository.deleteById(id);
    }

    private FriendshipDTO toDTO(Friendship friendship) {
        return new FriendshipDTO(
                friendship.getId(),
                friendship.getRequester().getId(),
                friendship.getRequester().getUsername(),
                friendship.getAddressee().getId(),
                friendship.getAddressee().getUsername(),
                friendship.getStatus(),
                friendship.getCreatedAt()
        );
    }
}
