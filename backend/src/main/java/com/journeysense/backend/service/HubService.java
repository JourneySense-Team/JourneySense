package com.journeysense.backend.service;

import com.journeysense.backend.dto.HubDTO;
import com.journeysense.backend.model.Hub;
import com.journeysense.backend.repository.HubRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HubService {

    private final HubRepository hubRepository;

    @Transactional(readOnly = true)
    public List<HubDTO> getAll() {
        return hubRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public HubDTO findById(UUID id) {
        return hubRepository.findById(id).map(this::toDTO).orElse(null);
    }

    @Transactional
    public HubDTO create(HubDTO hubDTO) {
        Hub hub = new Hub();
        hub.setName(hubDTO.name());
        hub.setDescription(hubDTO.description());
        hub.setPrivate(hubDTO.isPrivate());
        if (!hub.isPrivate()) {
            hub.setPassword(null);
        }
        hub.setTags(hubDTO.tags());
        return toDTO(hubRepository.save(hub));
    }

    @Transactional
    public HubDTO update(UUID id, HubDTO hubDTO) {
        Hub hub = hubRepository.findById(id).orElseThrow(() -> new RuntimeException("Hub not found"));
        hub.setName(hubDTO.name());
        hub.setDescription(hubDTO.description());
        hub.setPrivate(hubDTO.isPrivate());
        hub.setTags(hubDTO.tags());
        return toDTO(hubRepository.save(hub));
    }

    @Transactional
    public void delete(UUID id) {
        hubRepository.deleteById(id);
    }

    private HubDTO toDTO(Hub hub) {
        return new HubDTO(
                hub.getId(),
                hub.getName(),
                hub.getDescription(),
                hub.isPrivate(),
                hub.getTags(),
                hub.getMemberships().size(),
                hub.getPosts().size()
        );
    }
}
