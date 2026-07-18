package com.studentchatbot.controller;

import com.studentchatbot.entity.Timetable;
import com.studentchatbot.service.TimetableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timetable")
@CrossOrigin(origins = "http://localhost:5173")
public class TimetableController {

    @Autowired
    private TimetableService timetableService;

    // Add Timetable
    @PostMapping
    public ResponseEntity<Timetable> addTimetable(
            @RequestBody Timetable timetable) {

        return ResponseEntity.ok(
                timetableService.addTimetable(timetable)
        );
    }

    // Get All Timetable
    @GetMapping
    public ResponseEntity<List<Timetable>> getAllTimetable() {

        return ResponseEntity.ok(
                timetableService.getAllTimetable()
        );
    }

    // Get Timetable By Day
    @GetMapping("/day/{day}")
    public ResponseEntity<List<Timetable>> getTimetableByDay(
            @PathVariable String day) {

        return ResponseEntity.ok(
                timetableService.getTimetableByDay(day)
        );
    }

    // Update Timetable
    @PutMapping("/{id}")
    public ResponseEntity<Timetable> updateTimetable(
            @PathVariable Long id,
            @RequestBody Timetable timetable) {

        return ResponseEntity.ok(
                timetableService.updateTimetable(id, timetable)
        );
    }

    // Delete Timetable
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTimetable(
            @PathVariable Long id) {

        timetableService.deleteTimetable(id);

        return ResponseEntity.ok("Timetable deleted successfully.");
    }

}