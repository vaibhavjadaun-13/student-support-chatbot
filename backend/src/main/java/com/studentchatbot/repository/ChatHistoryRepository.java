package com.studentchatbot.repository;

import com.studentchatbot.entity.ChatHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatHistoryRepository extends JpaRepository<ChatHistory, Long> {

    List<ChatHistory> findByUserMessageContainingIgnoreCase(String keyword);

    List<ChatHistory> findAllByOrderByCreatedAtDesc();

}