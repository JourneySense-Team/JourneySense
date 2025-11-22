package com.journeysense.backend.controller;

import com.journeysense.backend.dto.HubDTO;
import com.journeysense.backend.dto.UserDTO;
import com.journeysense.backend.service.HubService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/api/hubs")
@CrossOrigin("*")
public class HubController {

    private final HubService hubService;

    @GetMapping
    public ResponseEntity<List<HubDTO>> getAllHubs() {
        return ResponseEntity.ok(hubService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HubDTO> getHubById(@PathVariable UUID id) {
        HubDTO hub = hubService.findById(id);
        if (hub == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(hub);
    }

    @PostMapping
    public ResponseEntity<HubDTO> createHub(@RequestBody HubDTO hubDTO) {
        return ResponseEntity.ok(hubService.create(hubDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<HubDTO> updateHub(@PathVariable UUID id, @RequestBody HubDTO hubDTO) {
        return ResponseEntity.ok(hubService.update(id, hubDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHub(@PathVariable UUID id) {
        hubService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/members")
    public ResponseEntity<List<UserDTO>> getMembers(@PathVariable UUID id) {
        return ResponseEntity.ok(hubService.getHubMembers(id));
    }
}
