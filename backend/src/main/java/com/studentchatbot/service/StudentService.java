package com.studentchatbot.service;

import com.studentchatbot.entity.Student;
import com.studentchatbot.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // Register Student
    public Student registerStudent(Student student) {
        return studentRepository.save(student);
    }

    // Find Student by Email
    public Optional<Student> getStudentByEmail(String email) {
        return studentRepository.findByEmail(email);
    }

    // Get Student by ID
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }
}