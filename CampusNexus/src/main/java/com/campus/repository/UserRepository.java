package com.campus.repository;

import com.campus.entity.User;
import com.campus.enums.UserRoles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email); // Find user by email
    List<User> findByRole(UserRoles role); // Get all users with a specific role
}
