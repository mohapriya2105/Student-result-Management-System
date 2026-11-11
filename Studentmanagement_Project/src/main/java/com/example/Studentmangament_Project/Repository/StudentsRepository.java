package com.example.Studentmangament_Project.Repository;

import com.example.Studentmangament_Project.Entity.Students;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentsRepository extends JpaRepository<Students, Long> {

}