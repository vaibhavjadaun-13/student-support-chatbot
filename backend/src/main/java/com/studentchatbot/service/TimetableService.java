package com.studentchatbot.service;

import com.studentchatbot.entity.Timetable;
import com.studentchatbot.repository.TimetableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TimetableService {

    @Autowired
    private TimetableRepository timetableRepository;

    // Add Timetable
    public Timetable addTimetable(Timetable timetable) {
        return timetableRepository.save(timetable);
    }

    // Get All Timetable
    public List<Timetable> getAllTimetable() {
        return timetableRepository.findAll();
    }

    // Get Timetable By Day
    public List<Timetable> getTimetableByDay(String day) {
        return timetableRepository.findByDay(day);
    }

    // Update Timetable
    public Timetable updateTimetable(Long id, Timetable updatedTimetable) {

        Timetable timetable = timetableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Timetable not found"));

        timetable.setDay(updatedTimetable.getDay());
        timetable.setSubject(updatedTimetable.getSubject());
        timetable.setFaculty(updatedTimetable.getFaculty());
        timetable.setRoom(updatedTimetable.getRoom());
        timetable.setStartTime(updatedTimetable.getStartTime());
        timetable.setEndTime(updatedTimetable.getEndTime());

        return timetableRepository.save(timetable);
    }

    // Delete Timetable
    public void deleteTimetable(Long id) {

        if (!timetableRepository.existsById(id)) {
            throw new RuntimeException("Timetable not found");
        }

        timetableRepository.deleteById(id);
    }

}