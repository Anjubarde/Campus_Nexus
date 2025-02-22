package com.campus.controller;

import com.campus.entity.JobApplication;
import com.campus.enums.ApplicationStatus;
import com.campus.model.JobApplicationResponse;
import com.campus.model.JobApplyResponse;
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
    @PostMapping("/apply/{studentRegisterNo}/{jobPostingId}")
    public ResponseEntity<JobApplyResponse> applyForJob(@PathVariable Long studentRegisterNo, @PathVariable Long jobPostingId) {
        try {
            JobApplication application = jobApplicationService.applyForJob(studentRegisterNo, jobPostingId);
            JobApplyResponse response = new JobApplyResponse();
            response.setSuccess(true);
            response.setId(application.getId());
            response.setStudentRegisterNo(application.getStudentRegisterNo());
            response.setJobPostingId(application.getJobPostingId());
            response.setStatus(application.getStatus());
            response.setAppliedAt(application.getAppliedAt());
            response.setUpdatedAt(application.getUpdatedAt());
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            JobApplyResponse response = new JobApplyResponse();
            response.setSuccess(false);
            response.setReasonForRejection(e.getMessage());
            return ResponseEntity.ok(response);
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
    @PutMapping("/{applicationId}/status/{applicationStatus}")
    public ResponseEntity<JobApplicationResponse> updateApplicationStatus(@PathVariable Long applicationId, @PathVariable ApplicationStatus applicationStatus) throws NotFoundException {
        JobApplicationResponse updatedApplication = jobApplicationService.updateApplicationStatus(applicationId, applicationStatus);
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

    @GetMapping("/all")
    public ResponseEntity<List<JobApplicationResponse>> getAllApplications() {
        List<JobApplicationResponse> applications = jobApplicationService.getAllApplications();
        return ResponseEntity.ok(applications);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        jobApplicationService.deleteApplication(id);
        return ResponseEntity.noContent().build();
    }
}
