package com.campus.controller;

import com.campus.entity.JobApplication;
import com.campus.enums.ApplicationStatus;
import com.campus.model.JobApplicationResponse;
import com.campus.services.JobApplicationService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-applications")
public class JobApplicationController {

    @Autowired
    private JobApplicationService jobApplicationService;

    // Endpoint for a student to apply for a job
    @PostMapping("/apply")
    public ResponseEntity<JobApplication> applyForJob(@RequestParam Long studentRegisterNo, @RequestParam Long jobPostingId) {
        try {
            JobApplication application = jobApplicationService.applyForJob(studentRegisterNo, jobPostingId);
            return ResponseEntity.ok(application);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null); // Return error message if needed
        }
    }

    // Endpoint to get all applications for a specific student
    @GetMapping("/student/{studentRegisterNo}")
    public ResponseEntity<List<JobApplicationResponse>> getApplicationsByStudent(@PathVariable Long studentRegisterNo) {
        List<JobApplicationResponse> applications = jobApplicationService.getApplicationsByStudent(studentRegisterNo);
        return ResponseEntity.ok(applications);
    }

    // Endpoint to export all applications to an Excel file
    @GetMapping("/export")
    public ResponseEntity<byte[]> exportApplicationsToExcel() {
        try {
            byte[] excelFile = jobApplicationService.exportApplicationsToExcel();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", "JobApplications.xlsx");
            return ResponseEntity.ok().headers(headers).body(excelFile);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    // Endpoint to update job application status
    @PutMapping("/{applicationId}/status")
    public ResponseEntity<JobApplicationResponse> updateApplicationStatus(@PathVariable Long applicationId, @RequestParam ApplicationStatus status) throws NotFoundException {
        JobApplicationResponse updatedApplication = jobApplicationService.updateApplicationStatus(applicationId, status);
        return ResponseEntity.ok(updatedApplication);
    }

    @GetMapping("/job/{jobPostingId}")
    public ResponseEntity<List<JobApplicationResponse>> getApplicationsByJob(@PathVariable Long jobPostingId) {
        List<JobApplicationResponse> applications = jobApplicationService.getApplicationsByJob(jobPostingId);
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/export/{jobPostingId}")
    public ResponseEntity<byte[]> exportApplicationsByJobToExcel(@PathVariable Long jobPostingId) {
        try {
            byte[] excelFile = jobApplicationService.exportApplicationsByJobToExcel(jobPostingId);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", "JobApplications_Job" + jobPostingId + ".xlsx");
            return ResponseEntity.ok().headers(headers).body(excelFile);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
