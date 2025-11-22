package com.journeysense.backend.service;

import com.journeysense.backend.dto.HubMembershipDTO;
import com.journeysense.backend.model.Hub;
import com.journeysense.backend.model.HubMembership;
import com.journeysense.backend.model.User;
import com.journeysense.backend.repository.HubMembershipRepository;
import com.journeysense.backend.repository.HubRepository;
import com.journeysense.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HubMembershipService {

    private final HubMembershipRepository hubMembershipRepository;
    private final UserRepository userRepository;
    private final HubRepository hubRepository;

    @Transactional(readOnly = true)
    public List<HubMembershipDTO> getAll() {
        return hubMembershipRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public HubMembershipDTO findById(UUID id) {
        return hubMembershipRepository.findById(id).map(this::toDTO).orElse(null);
    }

    @Transactional
    public HubMembershipDTO create(HubMembershipDTO hubMembershipDTO) {
        HubMembership hubMembership = new HubMembership();
        User user = userRepository.findById(hubMembershipDTO.userId()).orElseThrow(() -> new RuntimeException("User not found"));
        Hub hub = hubRepository.findById(hubMembershipDTO.hubId()).orElseThrow(() -> new RuntimeException("Hub not found"));

        hubMembership.setUser(user);
        hubMembership.setHub(hub);
        return toDTO(hubMembershipRepository.save(hubMembership));
    }

    @Transactional
    public void delete(UUID id) {
        hubMembershipRepository.deleteById(id);
    }

    private HubMembershipDTO toDTO(HubMembership hubMembership) {
        return new HubMembershipDTO(
                hubMembership.getId(),
                hubMembership.getUser().getId(),
                hubMembership.getHub().getId(),
                hubMembership.getJoinDate()
        );
    }
}
