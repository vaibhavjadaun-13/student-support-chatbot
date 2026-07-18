package com.studentchatbot.service;

import com.studentchatbot.entity.ChatHistory;
import com.studentchatbot.repository.ChatHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatHistoryService {

    @Autowired
    private ChatHistoryRepository chatHistoryRepository;

    // Save Chat
    public ChatHistory saveChat(ChatHistory chatHistory) {
        return chatHistoryRepository.save(chatHistory);
    }

    // Get All Chats
    public List<ChatHistory> getAllChats() {
        return chatHistoryRepository.findAllByOrderByCreatedAtDesc();
    }

    // Search Chat
    public List<ChatHistory> searchChat(String keyword) {
        return chatHistoryRepository.findByUserMessageContainingIgnoreCase(keyword);
    }

    // Delete Chat
    public void deleteChat(Long id) {
        chatHistoryRepository.deleteById(id);
    }

}