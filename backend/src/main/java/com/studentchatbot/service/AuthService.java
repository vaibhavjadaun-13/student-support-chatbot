package com.studentchatbot.service;

import com.studentchatbot.dto.LoginRequest;
import com.studentchatbot.dto.LoginResponse;
import com.studentchatbot.entity.Student;
import com.studentchatbot.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private StudentRepository studentRepository;

    public LoginResponse login(LoginRequest request) {

        System.out.println("Email entered: " + request.getEmail());
        System.out.println("Password entered: " + request.getPassword());
        Optional<Student> student = studentRepository.findById(1L);
        // Optional<Student> student = studentRepository.findByEmail(request.getEmail());

        if (student.isPresent()) {

            System.out.println("Database Email: " + student.get().getEmail());
            System.out.println("Database Password: " + student.get().getPassword());

            if (student.get().getPassword().equals(request.getPassword())) {

                return new LoginResponse(true, "Login Successful");

            }

            System.out.println("Password does not match.");

        } else {

            System.out.println("Email not found in database.");

        }

        return new LoginResponse(false, "Invalid Email or Password");
    }

    // Fix for Render build error: register method added
    public Student register(Student student) {
        return studentRepository.save(student);
    }
}