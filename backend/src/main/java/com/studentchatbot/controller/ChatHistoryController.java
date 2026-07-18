package com.studentchatbot.controller;

import com.studentchatbot.entity.ChatHistory;
import com.studentchatbot.service.ChatHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat-history")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatHistoryController {

    @Autowired
    private ChatHistoryService chatHistoryService;

    // Save Chat
    @PostMapping
    public ChatHistory saveChat(@RequestBody ChatHistory chatHistory) {

        return chatHistoryService.saveChat(chatHistory);

    }

    // Get All Chats
    @GetMapping
    public List<ChatHistory> getAllChats() {

        return chatHistoryService.getAllChats();

    }

    // Search Chats
    @GetMapping("/search")
    public List<ChatHistory> searchChat(
            @RequestParam String keyword) {

        return chatHistoryService.searchChat(keyword);

    }

    // Delete Chat
    @DeleteMapping("/{id}")
    public String deleteChat(@PathVariable Long id) {

        chatHistoryService.deleteChat(id);

        return "Chat Deleted Successfully";

    }

}