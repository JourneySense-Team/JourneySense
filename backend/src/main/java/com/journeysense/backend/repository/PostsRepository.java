package com.journeysense.backend.repository;

import com.journeysense.backend.model.Hub;
import com.journeysense.backend.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PostsRepository extends JpaRepository<Post, UUID> {
    List<Post> findByHubId(Hub hubId);
}
