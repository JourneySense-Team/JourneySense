package com.journeysense.backend.controller;


import com.journeysense.backend.dto.PostDTO;
import com.journeysense.backend.model.Hub;
import com.journeysense.backend.model.Post;
import com.journeysense.backend.model.TagType;
import com.journeysense.backend.model.User;
import com.journeysense.backend.repository.HubRepository;
import com.journeysense.backend.repository.PostsRepository;
import com.journeysense.backend.repository.UserRepository;
import com.journeysense.backend.service.FileService;
import com.journeysense.backend.service.PostsService;
import com.journeysense.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@RequestMapping("/api/posts")
@CrossOrigin("*")
public class PostsController {
    private final PostsService postsService;
    private final FileService fileService;
    private final UserRepository userRepository;
    private final HubRepository hubRepository;
    private final PostsRepository postRepository;

    // GET /api/posts - get all posts
    @GetMapping
    public ResponseEntity<List<PostDTO>> getAllPosts() {
        List<PostDTO> posts = postsService.getAll();
        return ResponseEntity.ok(posts);
    }

    // GET /api/posts/{id} - get a single post by ID
    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> getPostById(@PathVariable UUID id) {
        PostDTO post = postsService.findById(id);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(post);
    }

    @PostMapping("/upload")
    public ResponseEntity<Post> createPost(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam TagType tag,
            @RequestParam UUID userId,
            @RequestParam(required = false) UUID hubId,
            @RequestParam("file") MultipartFile file
    ) throws IOException {

        String fileUrl = fileService.saveFile(file);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Hub hub = null;
        if (hubId != null) {
            hub = hubRepository.findById(hubId)
                    .orElseThrow(() -> new RuntimeException("Hub not found"));
        }

        Post post = Post.builder()
                .title(title)
                .description(description)
                .tag(tag)
                .user(user)
                .hub(hub)
                .fileUrl(fileUrl)
                .build();

        return ResponseEntity.ok(postRepository.save(post));
    }

    // PUT /api/posts/{id} - update a post
    @PutMapping("/{id}")
    public ResponseEntity<PostDTO> updatePost(@PathVariable UUID id, @RequestBody PostDTO postDTO) {
        PostDTO updatedPost = postsService.update(id, postDTO);
        return ResponseEntity.ok(updatedPost);
    }

    // DELETE /api/posts/{id} - delete a post
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable UUID id) {
        postsService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PostDTO>> getPostsByUser(@PathVariable UUID userId) {
        List<PostDTO> posts = postsService.getAll().stream()
                .filter(post -> post.userId().equals(userId))
                .collect(Collectors.toList());
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/hub/{hubId}")
    public ResponseEntity<List<PostDTO>> getPostsByHub(@PathVariable Hub hubId) {
        List<PostDTO> posts = postsService.getPostsByHub(hubId);
        return ResponseEntity.ok(posts);
    }
}
