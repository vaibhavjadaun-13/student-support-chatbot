package com.studentchatbot.controller;

import com.studentchatbot.entity.Note;
import com.studentchatbot.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:5173")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadNote(
            @RequestParam("file") MultipartFile file
    ) {

        System.out.println("===== Upload API Hit =====");
        System.out.println("File: " + file.getOriginalFilename());

        try {

            Note note = noteService.uploadFile(file);

            return ResponseEntity.ok(note);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.badRequest().body(e.getMessage());

        }

    }

}