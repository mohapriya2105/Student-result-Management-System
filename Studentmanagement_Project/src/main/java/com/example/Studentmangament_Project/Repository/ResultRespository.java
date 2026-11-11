package com.example.Studentmangament_Project.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Studentmangament_Project.Entity.Result;

import java.util.List;

public interface ResultRespository extends JpaRepository<Result, Long> {

    List<Result> findByStudentId(Long studentId);
}