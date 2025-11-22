package com.journeysense.backend.controller;


import com.journeysense.backend.service.PostsService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/posts")
@CrossOrigin("*")
public class PostsController {
    private final PostsService postsService;

}
