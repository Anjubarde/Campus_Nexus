package com.campus.repository;

import com.campus.entity.JobApplication;
import com.campus.enums.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    // Find all job applications by student register number
    List<JobApplication> findByStudentRegisterNo(Long studentRegisterNo);

    // Find all job applications by job posting ID
    List<JobApplication> findByJobPostingId(Long jobPostingId);

    // Check if a student has already applied for a specific job
    boolean existsByStudentRegisterNoAndJobPostingId(Long studentRegisterNo, Long jobPostingId);

    // Fetch all applications for a specific job and specific status (optional if needed)
    List<JobApplication> findByJobPostingIdAndStatus(Long jobPostingId, String status);
    
}
