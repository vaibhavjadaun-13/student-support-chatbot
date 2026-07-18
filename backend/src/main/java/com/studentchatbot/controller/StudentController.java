package com.studentchatbot.controller;

import com.studentchatbot.entity.Student;
import com.studentchatbot.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/profile/{email}")
    public Student getProfile(@PathVariable String email) {

        return studentService.getProfile(email);

    }

    @PutMapping("/profile")
    public Student updateProfile(@RequestBody Student student) {

        return studentService.updateProfile(student);

    }

}