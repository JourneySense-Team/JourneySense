package com.journeysense.backend.controller;

import com.journeysense.backend.dto.*;
import com.journeysense.backend.model.User;
import com.journeysense.backend.repository.UserRepository;
import com.journeysense.backend.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDTO request) {
        if (userRepository.findByUsername(request.username()).isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken");
        }
        if (userRepository.findByEmail(request.email()).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already registered");
        }

        // Rule 1: Validate Roles
        User.Role finalRole = User.Role.APPRENTICE; // Default

        if (request.role() != null) {
            if (request.role() == User.Role.ADMIN) {
                // STRICT CHECK: Must use company email
                if (request.email().endsWith("@journeysense.com")) {
                    finalRole = User.Role.ADMIN;
                } else {
                    return ResponseEntity.badRequest().body("Only @journeysense.com emails can register as Admin.");
                }
            }
        }

        User user = User.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .username(request.username())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(finalRole)
                .level(1)
                .experience(0)
                .build();

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully as " + finalRole);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO request) {
        // Authenticate (checks DB)
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.usernameOrEmail(),
                        request.password()
                )
        );

        // If we get here, auth was successful. Load user to get ID and Role.
        User user = userRepository.findByUsername(request.usernameOrEmail())
                .or(() -> userRepository.findByEmail(request.usernameOrEmail()))
                .orElseThrow();

        // Generate Token
        // We load UserDetails for the token generation
        var userDetails = new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                java.util.List.of(new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
        );

        String token = jwtUtils.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponseDTO(
                token,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole()
        ));
    }
}