package com.campus.controller;


import com.campus.entity.User;
import com.campus.model.DashboardStats;
import com.campus.model.UserResponse;
import com.campus.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    // Create default admin (run once at startup or via endpoint)
    @PostMapping("/create-default-admin")
    public ResponseEntity<String> createDefaultAdmin() {
        userService.createDefaultAdmin();
        return ResponseEntity.ok("Default admin created successfully");
    }

    // Register a new coordinator
    @PostMapping("/register-coordinator")
    public ResponseEntity<UserResponse> registerCoordinator(@RequestBody User coordinator) {
        return ResponseEntity.ok(userService.registerCoordinator(coordinator));
    }

    // Verify a coordinator
    @PutMapping("/verify-coordinator/{id}")
    public ResponseEntity<UserResponse> verifyCoordinator(@PathVariable Long id) {
        return ResponseEntity.ok(userService.verifyCoordinator(id));
    }

    // Update user details
    @PutMapping("/update/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return ResponseEntity.ok(userService.updateUser(id, updatedUser));
    }

    // Delete a coordinator
    @DeleteMapping("/delete-coordinator/{id}")
    public ResponseEntity<String> deleteCoordinator(@PathVariable Long id) {
        userService.deleteCoordinator(id);
        return ResponseEntity.ok("Coordinator deleted successfully");
    }

    // Get all coordinators
    @GetMapping("/all-coordinators")
    public ResponseEntity<List<UserResponse>> getAllCoordinators() {
        return ResponseEntity.ok(userService.getAllCoordinators());
    }

    @PostMapping("/update-password/")
    public ResponseEntity<String> updatePassword(@RequestBody User user) {
//        userService.updatePassword(user);
        return ResponseEntity.ok("Password updated successfully");
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStats> getStats() {
        return ResponseEntity.ok(userService.getStats());
    }

}
