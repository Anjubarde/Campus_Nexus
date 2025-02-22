package com.campus.services;

import com.campus.entity.JobPosting;
import com.campus.entity.User;
import com.campus.model.JobPostingRequest;
import com.campus.model.JobPostingResponse;
import com.campus.repository.JobPostingRepository;
import com.campus.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobPostingService {

    @Autowired
    private JobPostingRepository jobPostingRepository;

    @Autowired
    private UserRepository userRepository;

    // Create a new job posting
    public JobPostingResponse createJobPosting(JobPostingRequest request, Long postedById) {
        User user = userRepository.findById(postedById)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        JobPosting jobPosting = new JobPosting();
        jobPosting.setJob_title(request.getJob_title());
        jobPosting.setJob_description(request.getJob_description());
        jobPosting.setCompanyName(request.getCompanyName());
        jobPosting.setStartDate(request.getStartDate());
        jobPosting.setEndDate(request.getEndDate());
        jobPosting.setJob_location(request.getJob_location());
        jobPosting.setEligibilityCriteria(request.getEligibilityCriteria());
        jobPosting.setCompany_url(request.getCompany_url());
        jobPosting.setCtc(request.getCtc());
        jobPosting.setActive(LocalDateTime.now().isBefore(request.getEndDate())); // Auto-calculate status
        jobPosting.setPostedBy(user);
        JobPosting savedJob = jobPostingRepository.save(jobPosting);
        return mapToResponse(savedJob);
    }

    // Get all active job postings
    public List<JobPostingResponse> getAllActiveJobs() {
        List<JobPosting> activeJobs = jobPostingRepository.findByIsActiveTrue();
        return activeJobs.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    // Get all job postings by a specific user
    public List<JobPostingResponse> getJobsPostedByUser(Long userId) {
        List<JobPosting> jobs = jobPostingRepository.findByPostedById(userId);
        return jobs.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    // Mark a job as inactive
    public void markJobAsInactive(Long jobId) {
        JobPosting jobPosting = jobPostingRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("Job not found"));

        jobPosting.setActive(false);
        jobPostingRepository.save(jobPosting);
    }

    // Utility method to map entity to response DTO
    private JobPostingResponse mapToResponse(JobPosting job) {
        JobPostingResponse response = new JobPostingResponse();
        response.setId(job.getId());
        response.setJob_title(job.getJob_title());
        response.setJob_description(job.getJob_description());
        response.setCompanyName(job.getCompanyName());
        response.setStartDate(job.getStartDate());
        response.setEndDate(job.getEndDate());
        response.setJob_location(job.getJob_location());
        response.setEligibilityCriteria(job.getEligibilityCriteria());
        response.setCompany_url(job.getCompany_url());
        response.setCtc(job.getCtc());
        response.setActive(job.isActive());
        response.setPostedByName(job.getPostedBy().getName());
        return response;
    }

    public List<JobPostingResponse> getAllJobs() {
        List<JobPosting> jobs = jobPostingRepository.findAll();
        return jobs.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public JobPostingResponse getJobById(Long jobId) {
        JobPosting job = jobPostingRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("Job not found"));
        return mapToResponse(job);
    }

    public JobPostingResponse updateJob(Long jobId, Long userId, JobPostingRequest request) {
        JobPosting job = jobPostingRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("Job not found"));

        job.setJob_title(request.getJob_title());
        job.setJob_description(request.getJob_description());
        job.setCompanyName(request.getCompanyName());
        job.setStartDate(request.getStartDate());
        job.setEndDate(request.getEndDate());
        job.setJob_location(request.getJob_location());
        job.setEligibilityCriteria(request.getEligibilityCriteria());
        job.setCompany_url(request.getCompany_url());
        job.setCtc(request.getCtc());
        job.setActive(request.isActive());
        job.setPostedBy(userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found")));
        JobPosting updatedJob = jobPostingRepository.save(job);
        return mapToResponse(updatedJob);
    }
}
