package com.journeysense.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Dezactivam CSRF (nu e necesar pentru API-uri REST stateless in hackathon)
                .csrf(AbstractHttpConfigurer::disable)

                // 2. Activam CORS (permitem Frontend-ului si Mobilului sa ne apeleze)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // 3. Permitem accesul liber la TOATE endpoint-urile (fara login momentan)
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                );

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Permitem accesul de oriunde.
        // In productie ai pune doar "http://localhost:5173" (React)
        configuration.setAllowedOrigins(List.of("*"));

        // Permitem orice metoda (GET, POST, PUT, DELETE, OPTIONS)
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Permitem orice header (Authorization, Content-Type, etc.)
        configuration.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}