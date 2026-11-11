package com.example.Studentmangament_Project.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5174")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(
            @RequestBody Map<String, String> loginData) {

        String username = loginData.get("username");
        String password = loginData.get("password");

        Map<String, String> response = new HashMap<>();

        if ("admin".equals(username) && "admin123".equals(password)) {

            response.put("message", "Login successful");
            response.put("username", "admin");

            return ResponseEntity.ok(response);
        }

        response.put("message", "Invalid username or password");

        return ResponseEntity.status(401).body(response);
    }
}