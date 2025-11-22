package com.journeysense.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "user_badges")
public class UserBadge {
    @Id
    @GeneratedValue
    @Column(updatable = false, nullable = false, columnDefinition = "UUID DEFAULT gen_random_uuid()")
    private UUID id;

    @Setter
    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @Setter
    @ManyToOne(optional = false)
    @JoinColumn(name = "badge_id")
    private Badge badge;

    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime dateAcquired = LocalDateTime.now();
}
