package com.studentchatbot.repository;

import com.studentchatbot.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    // Search attendance by subject
    List<Attendance> findBySubjectContainingIgnoreCase(String subject);

    // Get all attendance ordered by subject
    List<Attendance> findAllByOrderBySubjectAsc();

}