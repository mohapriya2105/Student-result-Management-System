package com.example.Studentmangament_Project.Controller;

import com.example.Studentmangament_Project.Entity.Students;
import com.example.Studentmangament_Project.Service.StudentsService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    private final StudentsService service;

    public StudentController(StudentsService service) {
        this.service = service;
    }

    @PostMapping
    public Students addStudent(@RequestBody Students student) {
        return service.addStudent(student);
    }

    @GetMapping
    public List<Students> getAllStudents() {
        return service.getAllStudents();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Students> getStudentById(@PathVariable Long id) {

        return service.getStudentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Students updateStudent(
            @PathVariable Long id,
            @RequestBody Students student) {

        return service.updateStudent(id, student);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {

        service.deleteStudent(id);

        return ResponseEntity.ok("Student deleted successfully");
    }
}