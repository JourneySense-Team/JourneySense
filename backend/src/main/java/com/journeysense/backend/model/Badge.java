package com.journeysense.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Entity
@Table(name = "badges")
public class Badge {
    @Id
    @GeneratedValue
    @Column(updatable = false, nullable = false, columnDefinition = "UUID DEFAULT gen_random_uuid()")
    private UUID id;

    @Setter
    @Builder.Default
    @Column(nullable = false)
    private String title= "";

    @Setter
    @Builder.Default
    private String description = "";

    @Setter
    @Builder.Default
    @Column(nullable = false)
    private int rewardExperience = 0;



}
