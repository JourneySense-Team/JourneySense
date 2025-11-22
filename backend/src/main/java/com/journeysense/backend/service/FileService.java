package com.journeysense.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileService {
    private final Path root = Paths.get("uploads");

    public FileService() throws IOException {
        if (!Files.exists(root)) {
            Files.createDirectories(root);
        }
    }

    public String saveFile(MultipartFile file) throws IOException {
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path path = root.resolve(filename);
        Files.copy(file.getInputStream(), path);

        return "/uploads/" + filename;
    }
}
