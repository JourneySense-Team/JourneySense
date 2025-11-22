package com.journeysense.backend.service;

import com.journeysense.backend.dto.UserDTO;
import com.journeysense.backend.model.User;
import com.journeysense.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<UserDTO> getAll() {
        return userRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserDTO findById(UUID id) {
        return userRepository.findById(id).map(this::toDTO).orElse(null);
    }

    @Transactional
    public UserDTO create(UserDTO userDTO) {
        User user = new User();
        user.setFirstName(userDTO.firstName());
        user.setLastName(userDTO.lastName());
        user.setUsername(userDTO.username());
        user.setEmail(userDTO.email());
        user.setLevel(userDTO.level());
        user.setExperience(userDTO.experience());
        user.setRole(userDTO.role());
        return toDTO(userRepository.save(user));
    }

    @Transactional
    public UserDTO update(UUID id, UserDTO userDTO) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setFirstName(userDTO.firstName());
        user.setLastName(userDTO.lastName());
        user.setUsername(userDTO.username());
        user.setEmail(userDTO.email());
        user.setLevel(userDTO.level());
        user.setExperience(userDTO.experience());
        user.setRole(userDTO.role());
        return toDTO(userRepository.save(user));
    }

    @Transactional
    public void delete(UUID id) {
        userRepository.deleteById(id);
    }

    private UserDTO toDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getUsername(),
                user.getEmail(),
                user.getLevel(),
                user.getExperience(),
                user.getRole()
        );
    }
}
