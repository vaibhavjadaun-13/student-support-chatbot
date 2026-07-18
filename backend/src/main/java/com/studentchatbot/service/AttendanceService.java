package com.studentchatbot.service;

import com.studentchatbot.entity.Attendance;
import com.studentchatbot.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    public Attendance addAttendance(Attendance attendance) {

        double percentage =
                ((double) attendance.getAttendedClasses() /
                        attendance.getTotalClasses()) * 100;

        attendance.setAttendancePercentage(percentage);

        if (percentage >= 75) {
            attendance.setStatus("Present");
        } else {
            attendance.setStatus("Short Attendance");
        }

        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAllByOrderBySubjectAsc();
    }

    public List<Attendance> searchAttendance(String subject) {
        return attendanceRepository.findBySubjectContainingIgnoreCase(subject);
    }

    public Attendance updateAttendance(Long id, Attendance attendance) {

        Attendance existing =
                attendanceRepository.findById(id).orElse(null);

        if (existing == null) {
            return null;
        }

        existing.setSubject(attendance.getSubject());
        existing.setTotalClasses(attendance.getTotalClasses());
        existing.setAttendedClasses(attendance.getAttendedClasses());

        double percentage =
                ((double) attendance.getAttendedClasses() /
                        attendance.getTotalClasses()) * 100;

        existing.setAttendancePercentage(percentage);

        if (percentage >= 75) {
            existing.setStatus("Present");
        } else {
            existing.setStatus("Short Attendance");
        }

        return attendanceRepository.save(existing);
    }

    public void deleteAttendance(Long id) {
        attendanceRepository.deleteById(id);
    }
}