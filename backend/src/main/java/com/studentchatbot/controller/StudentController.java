package com.studentchatbot.controller;

import com.studentchatbot.entity.Student;
import com.studentchatbot.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

  @Autowired
  private StudentService studentService;

  // Register Student
  @PostMapping("/register")
  public Student registerStudent(@RequestBody Student student) {
    return studentService.registerStudent(student);
  }

  // Get Student by ID
  @GetMapping("/{id}")
  public Optional<Student> getStudentById(@PathVariable Long id) {
    return studentService.getStudentById(id);
  }

  // Get Student by Email
  @GetMapping("/email/{email}")
  public Optional<Student> getStudentByEmail(@PathVariable String email) {
    return studentService.getStudentByEmail(email);
  }
}