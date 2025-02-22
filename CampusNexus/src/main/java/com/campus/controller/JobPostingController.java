package com.campus.controller;

import com.campus.model.JobApplicationResponse;
import com.campus.model.JobPostingRequest;
import com.campus.model.JobPostingResponse;
import com.campus.services.JobPostingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/job-postings")
public class JobPostingController {

    @Autowired
    private JobPostingService jobPostingService;

    // Create a job posting
    @PostMapping("/create/{postedById}")
    public ResponseEntity<JobPostingResponse> createJobPosting(@Valid @RequestBody JobPostingRequest request,
                                                               @PathVariable Long postedById) {
        return ResponseEntity.ok(jobPostingService.createJobPosting(request, postedById));
    }

    // Get all active job postings
    @GetMapping("/active")
    public ResponseEntity<List<JobPostingResponse>> getAllActiveJobs() {
        return ResponseEntity.ok(jobPostingService.getAllActiveJobs());
    }

    // Get jobs posted by a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<JobPostingResponse>> getJobsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(jobPostingService.getJobsPostedByUser(userId));
    }

    // Mark a job as inactive
    @PutMapping("/{jobId}/deactivate")
    public ResponseEntity<Void> markJobAsInactive(@PathVariable Long jobId) {
        jobPostingService.markJobAsInactive(jobId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<JobPostingResponse>> getAllJobs() {
        return ResponseEntity.ok(jobPostingService.getAllJobs());
    }

    @GetMapping("/find/{jobId}")
    public ResponseEntity<JobPostingResponse> getJobById(@PathVariable Long jobId) {
        return ResponseEntity.ok(jobPostingService.getJobById(jobId));
    }

    @PutMapping("update/{updatedUserId}/{jobId}")
    public ResponseEntity<JobPostingResponse> updateJob(@PathVariable Long jobId, @PathVariable Long updatedUserId, @RequestBody JobPostingRequest request) {
        return ResponseEntity.ok(jobPostingService.updateJob(jobId, updatedUserId, request));
    }

}
