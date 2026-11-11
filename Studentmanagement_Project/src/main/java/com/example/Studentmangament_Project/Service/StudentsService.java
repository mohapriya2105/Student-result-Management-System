package com.example.Studentmangament_Project.Service;

import com.example.Studentmangament_Project.Entity.Students;
import com.example.Studentmangament_Project.Repository.StudentsRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentsService {

    private final StudentsRepository repository;

    public StudentsService(StudentsRepository repository) {
        this.repository = repository;
    }

    public Students addStudent(Students student) {
        return repository.save(student);
    }

    public List<Students> getAllStudents() {
        return repository.findAll();
    }

    public Optional<Students> getStudentById(Long id) {
        return repository.findById(id);
    }

    public Students updateStudent(Long id, Students student) {

        Students existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        existing.setName(student.getName());
        existing.setEmail(student.getEmail());
        existing.setCourse(student.getCourse());

        return repository.save(existing);
    }

    public void deleteStudent(Long id) {
        repository.deleteById(id);
    }
}