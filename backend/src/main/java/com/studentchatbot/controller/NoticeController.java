package com.studentchatbot.controller;

import com.studentchatbot.entity.Notice;
import com.studentchatbot.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notice")
@CrossOrigin(origins = "http://localhost:5173")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    // Add Notice
    @PostMapping
    public ResponseEntity<Notice> addNotice(
            @RequestBody Notice notice) {

        return ResponseEntity.ok(
                noticeService.addNotice(notice)
        );
    }

    // Get All Notices
    @GetMapping
    public ResponseEntity<List<Notice>> getAllNotices() {

        return ResponseEntity.ok(
                noticeService.getAllNotices()
        );
    }

    // Get Important Notices
    @GetMapping("/important")
    public ResponseEntity<List<Notice>> getImportantNotices() {

        return ResponseEntity.ok(
                noticeService.getImportantNotices()
        );
    }

    // Search Notice
    @GetMapping("/search")
    public ResponseEntity<List<Notice>> searchNotice(
            @RequestParam String keyword) {

        return ResponseEntity.ok(
                noticeService.searchNotice(keyword)
        );
    }

    // Update Notice
    @PutMapping("/{id}")
    public ResponseEntity<Notice> updateNotice(
            @PathVariable Long id,
            @RequestBody Notice notice) {

        return ResponseEntity.ok(
                noticeService.updateNotice(id, notice)
        );
    }

    // Delete Notice
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNotice(
            @PathVariable Long id) {

        noticeService.deleteNotice(id);

        return ResponseEntity.ok("Notice deleted successfully.");
    }

}