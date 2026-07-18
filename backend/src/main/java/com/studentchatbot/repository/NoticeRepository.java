package com.studentchatbot.repository;

import com.studentchatbot.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

    // Get all notices ordered by latest date
    List<Notice> findAllByOrderByNoticeDateDesc();

    // Get only important notices
    List<Notice> findByImportantTrue();

    // Search notices by title
    List<Notice> findByTitleContainingIgnoreCase(String title);

}