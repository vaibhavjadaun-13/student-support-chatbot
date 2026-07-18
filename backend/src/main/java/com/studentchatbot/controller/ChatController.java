package com.studentchatbot.controller;

import com.studentchatbot.dto.ChatRequest;
import com.studentchatbot.dto.ChatResponse;
import com.studentchatbot.service.GeminiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request) {

        String reply = geminiService.getResponse(request.getMessage());

        return new ChatResponse(reply);
    }

}