package com.campus.repository;

import com.campus.entity.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {

    // Get all active job postings
    List<JobPosting> findByIsActiveTrue();

    // Get all job postings for a specific coordinator/admin
    List<JobPosting> findByPostedById(Long userId);
}
