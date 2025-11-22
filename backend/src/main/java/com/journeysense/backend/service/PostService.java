package com.journeysense.backend.service;

import com.journeysense.backend.dto.PostDTO;
import com.journeysense.backend.model.Hub;
import com.journeysense.backend.model.Post;
import com.journeysense.backend.model.User;
import com.journeysense.backend.repository.HubRepository;
import com.journeysense.backend.repository.PostRepository;
import com.journeysense.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final HubRepository hubRepository;

    @Transactional(readOnly = true)
    public List<PostDTO> getAll() {
        return postRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PostDTO findById(UUID id) {
        return postRepository.findById(id).map(this::toDTO).orElse(null);
    }

    @Transactional
    public PostDTO create(PostDTO postDTO) {
        Post post = new Post();
        User user = userRepository.findById(postDTO.userId()).orElseThrow(() -> new RuntimeException("User not found"));
        Hub hub = null;
        if (postDTO.hubId() != null) {
            hub = hubRepository.findById(postDTO.hubId()).orElse(null); // Hub can be null
        }

        post.setTitle(postDTO.title());
        post.setDescription(postDTO.description());
        post.setType(postDTO.type());
        post.setTag(postDTO.tag());
        post.setFileUrl(postDTO.fileUrl());
        post.setUser(user);
        post.setHub(hub);
        
        return toDTO(postRepository.save(post));
    }

    @Transactional
    public PostDTO update(UUID id, PostDTO postDTO) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        Hub hub = null;
        if (postDTO.hubId() != null) {
            hub = hubRepository.findById(postDTO.hubId()).orElse(null);
        }

        post.setTitle(postDTO.title());
        post.setDescription(postDTO.description());
        post.setType(postDTO.type());
        post.setTag(postDTO.tag());
        post.setFileUrl(postDTO.fileUrl());
        post.setHub(hub);

        return toDTO(postRepository.save(post));
    }

    @Transactional
    public void delete(UUID id) {
        postRepository.deleteById(id);
    }

    private PostDTO toDTO(Post post) {
        return new PostDTO(
                post.getId(),
                post.getTitle(),
                post.getDescription(),
                post.getType(),
                post.getTag(),
                post.getFileUrl(),
                post.getCreatedAt(),
                post.isTeacherEndorsed(),
                post.getUser().getId(),
                post.getUser().getUsername(),
                post.getHub() != null ? post.getHub().getId() : null,
                post.getComments().size()
        );
    }
}
