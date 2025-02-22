package com.campus.controller;

import com.campus.entity.Student;
import com.campus.entity.User;
import com.campus.model.LoginRequest;
import com.campus.services.StudentService;
import com.campus.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private StudentService studentService;

    //Student Login
    @PostMapping("/student/login")
    public ResponseEntity<?> studentLogin(@RequestBody LoginRequest loginRequest) throws Exception {
        return studentService.studentAuthentication(loginRequest);
    }

    //User login
    @PostMapping("/user/login")
    public ResponseEntity<?> userLogin(@RequestBody LoginRequest loginRequest) {
        return userService.userAuthentication(loginRequest);
    }
}
