package com.journeysense.backend.controller;

import com.journeysense.backend.dto.CommentDTO;
import com.journeysense.backend.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

        import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class CommentsController {

    private final CommentService reviewService;

    @GetMapping
    public ResponseEntity<List<CommentDTO>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommentDTO> getReviewById(@PathVariable UUID id) {
        CommentDTO review = reviewService.findById(id);
        return review != null ? ResponseEntity.ok(review) : ResponseEntity.notFound().build();
    }

    @GetMapping("/reviewer/{reviewerId}")
    public ResponseEntity<List<CommentDTO>> getReviewsByReviewer(@PathVariable UUID reviewerId) {
        return ResponseEntity.ok(reviewService.findByReviewerId(reviewerId));
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentDTO>> getReviewsByPost(@PathVariable UUID postId) {
        return ResponseEntity.ok(reviewService.findByPostId(postId));
    }

    @PostMapping
    public ResponseEntity<CommentDTO> createReview(@RequestBody CommentDTO reviewDTO) {
        return ResponseEntity.ok(reviewService.create(reviewDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommentDTO> updateReview(@PathVariable UUID id, @RequestBody CommentDTO reviewDTO) {
        return ResponseEntity.ok(reviewService.update(id, reviewDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable UUID id) {
        reviewService.delete(id);
        return ResponseEntity.noContent().build();
    }
}