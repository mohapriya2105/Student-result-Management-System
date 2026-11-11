package com.example.Studentmangament_Project.Service;

import com.example.Studentmangament_Project.Entity.Result;
import com.example.Studentmangament_Project.Repository.ResultRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultService {

    private final ResultRepository repository;

    public ResultService(ResultRepository repository) {
        this.repository = repository;
    }

    public Result addResult(Result result) {
        return repository.save(result);
    }

    public List<Result> getAllResults() {
        return repository.findAll();
    }

    public List<Result> getResultsByStudent(Long studentId) {
        return repository.findByStudentId(studentId);
    }

    public double calculatePercentage(Long studentId) {
        List<Result> results = repository.findByStudentId(studentId);

        if (results.isEmpty()) {
            return 0;
        }

        double total = 0;

        for (Result result : results) {
            total += result.getMarks();
        }

        return total / results.size();
    }

    public String calculateGrade(Long studentId) {
        double percentage = calculatePercentage(studentId);

        if (percentage >= 90) {
            return "A+";
        } else if (percentage >= 80) {
            return "A";
        } else if (percentage >= 70) {
            return "B";
        } else if (percentage >= 60) {
            return "C";
        } else if (percentage >= 40) {
            return "D";
        } else {
            return "F";
        }
    }

    public void deleteResult(Long id) {
        repository.deleteById(id);
    }
}