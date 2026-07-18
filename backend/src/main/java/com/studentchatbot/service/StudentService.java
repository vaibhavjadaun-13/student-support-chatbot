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

    public Student getProfile(String email) {

        Optional<Student> student = studentRepository.findByEmail(email);

        return student.orElse(null);

    }

    public Student updateProfile(Student updatedStudent) {

        Optional<Student> student =
                studentRepository.findByEmail(updatedStudent.getEmail());

        if(student.isPresent()){

            Student existing = student.get();

            existing.setFullName(updatedStudent.getFullName());
            existing.setCourse(updatedStudent.getCourse());
            existing.setSemester(updatedStudent.getSemester());

            return studentRepository.save(existing);

        }

        return null;

    }

}