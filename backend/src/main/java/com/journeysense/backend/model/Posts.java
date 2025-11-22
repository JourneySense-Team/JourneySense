package com.journeysense.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "posts")
public class Posts {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column
    private String description;

    @Column
    private String title;

    @Column
    @Enumerated
    private TagType tag;

    @Column
    private String date;

//    @Column
//    private File file;

//    @ManyToOne
//    private User user;

}
