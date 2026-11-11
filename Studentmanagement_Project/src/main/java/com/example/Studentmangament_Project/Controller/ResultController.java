package com.example.Studentmangament_Project.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Studentmangament_Project.Entity.Result;
import com.example.Studentmangament_Project.Service.ResultService;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/results")
@CrossOrigin(origins = "http://localhost:5173")
public class ResultController {

    private final ResultService service;

    public ResultController(ResultService service) {
        this.service = service;
    }

    // POST - Add Result
    @PostMapping
    public Result addResult(@RequestBody Result result) {
        return service.addResult(result);
    }

    // GET - Get all Results
    @GetMapping
    public List<Result> getAllResults() {
        return service.getAllResults();
    }

    // GET - Get results by Student ID
    @GetMapping("/student/{id}")
    public List<Result> getResultsByStudent(@PathVariable Long id) {
        return service.getResultsByStudent(id);
    }

    // GET - Get student summary
    @GetMapping("/student/{id}/summary")
    public ResponseEntity<Map<String, Object>> getSummary(
            @PathVariable Long id) {

        double percentage = service.calculatePercentage(id);
        String grade = service.calculateGrade(id);

        Map<String, Object> summary = new HashMap<>();

        summary.put("studentId", id);
        summary.put("percentage", percentage);
        summary.put("grade", grade);
        summary.put("result", percentage >= 40 ? "PASS" : "FAIL");

        return ResponseEntity.ok(summary);
    }

    // DELETE - Delete Result
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteResult(@PathVariable Long id) {

        service.deleteResult(id);

        return ResponseEntity.ok("Result deleted successfully");
    }
}