package com.journeysense.backend.service;

import com.journeysense.backend.dto.CommentDTO;
import com.journeysense.backend.model.Comment;
import com.journeysense.backend.model.Post;
import com.journeysense.backend.model.User;
import com.journeysense.backend.repository.CommentRepository;
import com.journeysense.backend.repository.PostsRepository;
import com.journeysense.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostsRepository postsRepository;

    @Transactional(readOnly = true)
    public List<CommentDTO> getAll() {
        return commentRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CommentDTO findById(UUID id) {
        return commentRepository.findById(id).map(this::toDTO).orElse(null);
    }

    @Transactional
    public CommentDTO create(CommentDTO commentDTO) {
        Comment comment = new Comment();
        User author = userRepository.findById(commentDTO.authorId()).orElseThrow(() -> new RuntimeException("Author not found"));
        Post post = postsRepository.findById(commentDTO.postId()).orElseThrow(() -> new RuntimeException("Post not found"));

        comment.setText(commentDTO.text());
        comment.setAuthor(author);
        comment.setPost(post);
        return toDTO(commentRepository.save(comment));
    }

    @Transactional
    public CommentDTO update(UUID id, CommentDTO commentDTO) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment not found"));
        comment.setText(commentDTO.text());
        return toDTO(commentRepository.save(comment));
    }

    @Transactional
    public void delete(UUID id) {
        commentRepository.deleteById(id);
    }

    private CommentDTO toDTO(Comment comment) {
        return new CommentDTO(
                comment.getId(),
                comment.getText(),
                comment.getAuthor().getId(),
                comment.getAuthor().getUsername(),
                comment.getPost().getId(),
                comment.getCreatedAt()
        );
    }
}
