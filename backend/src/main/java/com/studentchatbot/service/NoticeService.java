package com.studentchatbot.service;

import com.studentchatbot.entity.Notice;
import com.studentchatbot.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeService {

    @Autowired
    private NoticeRepository noticeRepository;

    // Add Notice
    public Notice addNotice(Notice notice) {
        return noticeRepository.save(notice);
    }

    // Get All Notices (Latest First)
    public List<Notice> getAllNotices() {
        return noticeRepository.findAllByOrderByNoticeDateDesc();
    }

    // Get Important Notices
    public List<Notice> getImportantNotices() {
        return noticeRepository.findByImportantTrue();
    }

    // Search Notice by Title
    public List<Notice> searchNotice(String keyword) {
        return noticeRepository.findByTitleContainingIgnoreCase(keyword);
    }

    // Update Notice
    public Notice updateNotice(Long id, Notice updatedNotice) {

        Notice notice = noticeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notice not found"));

        notice.setTitle(updatedNotice.getTitle());
        notice.setDescription(updatedNotice.getDescription());
        notice.setNoticeDate(updatedNotice.getNoticeDate());
        notice.setImportant(updatedNotice.getImportant());

        return noticeRepository.save(notice);
    }

    // Delete Notice
    public void deleteNotice(Long id) {

        if (!noticeRepository.existsById(id)) {
            throw new RuntimeException("Notice not found");
        }

        noticeRepository.deleteById(id);
    }

}