package com.campus.services;

import com.campus.entity.JobApplication;
import com.campus.entity.JobPosting;
import com.campus.entity.Student;
import com.campus.enums.ApplicationStatus;
import com.campus.model.JobApplicationResponse;
import com.campus.model.StudentEditResponse;
import com.campus.repository.JobApplicationRepository;
import com.campus.repository.JobPostingRepository;
import com.campus.repository.StudentRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.time.LocalDateTime;

@Service
public class JobApplicationService {

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private JobPostingRepository jobPostingRepository;

    // Student applies for a job
    @Transactional
    public JobApplication applyForJob(Long studentRegisterNo, Long jobPostingId) {
        // Check if the student has already applied for the job
        if (jobApplicationRepository.existsByStudentRegisterNoAndJobPostingId(studentRegisterNo, jobPostingId)) {
            throw new IllegalArgumentException("You have already applied for this job.");
        }
        JobApplication application = new JobApplication();
        application.setStudentRegisterNo(studentRegisterNo);
        application.setJobPostingId(jobPostingId);
        application.setStatus(ApplicationStatus.APPLIED);
        application.setAppliedAt(LocalDateTime.now());
        return jobApplicationRepository.save(application);
    }

    // Retrieve all applications submitted by a specific student
    public List<JobApplicationResponse> getApplicationsByStudent(Long studentRegisterNo) {
        List<JobApplication> applications = jobApplicationRepository.findByStudentRegisterNo(studentRegisterNo);
        return applications.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    // Fetch applications by job posting ID
    public List<JobApplicationResponse> getApplicationsByJob(Long jobPostingId) {
        List<JobApplication> applications = jobApplicationRepository.findByJobPostingId(jobPostingId);
        return applications.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    // Update application status
    // Method to update application status
    public JobApplicationResponse updateApplicationStatus(Long applicationId, ApplicationStatus newStatus) throws NotFoundException {
        // Fetch the application by ID
        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new NotFoundException("Job application not found with ID: " + applicationId));
        // Update the status and the timestamp
        application.setStatus(newStatus);
        application.setUpdatedAt(LocalDateTime.now());
        // Save the updated application
        JobApplication updatedApplication = jobApplicationRepository.save(application);
        // Map to response object
        return mapToResponse(updatedApplication);
    }



    // Export all job applications to Excel
    public byte[] exportApplicationsToExcel() throws Exception {
        List<JobApplication> applications = jobApplicationRepository.findAll();

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Job Applications ");

        // Header row
        Row headerRow = sheet.createRow(0);
        String[] headers = {
                "Application ID", "Student Register No", "Full Name", "Email", "Mobile",
                "Stream", "Application Status", "Applied At", "Updated At"
        };
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
        }

        // Data rows
        int rowNum = 1;
        for (JobApplication application : applications) {
            // Fetch the student details based on the student register number
            Optional<Student> optionalStudent = studentRepository.findByRegisterNo(application.getStudentRegisterNo());

            Student student = optionalStudent.get();

            if (student != null) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(application.getId());
                row.createCell(1).setCellValue(application.getStudentRegisterNo());
                row.createCell(2).setCellValue(student.getFullName());
                row.createCell(3).setCellValue(student.getEmail());
                row.createCell(4).setCellValue(student.getMobile());
                row.createCell(5).setCellValue(student.getStreams().toString());
                row.createCell(6).setCellValue(application.getStatus().toString());
                row.createCell(7).setCellValue(application.getAppliedAt().toString());
                row.createCell(8).setCellValue(application.getUpdatedAt() != null ? application.getUpdatedAt().toString() : "");
            }
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();
        return outputStream.toByteArray();
    }

    // Fetch applications by job posting ID and export details to Excel
    public byte[] exportApplicationsByJobToExcel(Long jobPostingId) throws Exception {
        // Fetch all job applications for the specific job ID
        List<JobApplication> applications = jobApplicationRepository.findByJobPostingId(jobPostingId);

        // Fetch students based on job application studentRegisterNo
        Workbook workbook = new XSSFWorkbook();
        String sheetName = "Job_Applications_For_"+jobPostingRepository.findById(jobPostingId).get().getCompanyName();
        Sheet sheet = workbook.createSheet(sheetName);

        // Header row
        Row headerRow = sheet.createRow(0);
        String[] headers = {
                "Application ID", "Student Register No", "Full Name", "Email", "Mobile",
                "Stream", "Application Status", "Applied At", "Updated At"
        };
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
        }

        // Data rows
        int rowNum = 1;
        for (JobApplication application : applications) {
            // Fetch the student details based on the student register number
            Optional<Student> optionalStudent = studentRepository.findByRegisterNo(application.getStudentRegisterNo());

            Student student = optionalStudent.get();

            if (student != null) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(application.getId());
                row.createCell(1).setCellValue(application.getStudentRegisterNo());
                row.createCell(2).setCellValue(student.getFullName());
                row.createCell(3).setCellValue(student.getEmail());
                row.createCell(4).setCellValue(student.getMobile());
                row.createCell(5).setCellValue(student.getStreams().toString());
                row.createCell(6).setCellValue(application.getStatus().toString());
                row.createCell(7).setCellValue(application.getAppliedAt().toString());
                row.createCell(8).setCellValue(application.getUpdatedAt() != null ? application.getUpdatedAt().toString() : "");
            }
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();
        return outputStream.toByteArray();
    }

    // Map JobApplication entity to response model
    private JobApplicationResponse mapToResponse(JobApplication application) {
        JobApplicationResponse response = new JobApplicationResponse();
        response.setApplicationId(application.getId());
        response.setStudentRegisterNo(application.getStudentRegisterNo());
        response.setJobPostingId(application.getJobPostingId());
        response.setStatus(application.getStatus());
        response.setAppliedAt(application.getAppliedAt());
        response.setUpdatedAt(application.getUpdatedAt());

        // Fetch job details based on jobPostingId
        JobPosting job = jobPostingRepository.findById(application.getJobPostingId()).orElse(null);
        if (job != null) {
            response.setJob_title(job.getJob_title());
            response.setCompanyName(job.getCompanyName());
            response.setJob_description(job.getJob_description());
            response.setJob_location(job.getJob_location());
            response.setEligibilityCriteria(job.getEligibilityCriteria());
            response.setCompany_url(job.getCompany_url());
            response.setCtc(job.getCtc());
            response.setActive(job.isActive());
            response.setPostedBy(job.getPostedBy().getName());
        }

        if(application.getStudentRegisterNo() != null) {
            // Fetch student details based on studentRegisterNo
            Student student = studentRepository.findByRegisterNo(application.getStudentRegisterNo()).orElse(null);
            StudentEditResponse studentEditResponse = new StudentEditResponse();
            if (student != null) {
                studentEditResponse.setId(student.getId());
                studentEditResponse.setRegisterNo(student.getRegisterNo());
                studentEditResponse.setFullName(student.getFullName());
                studentEditResponse.setEmail(student.getEmail());
                studentEditResponse.setMobile(student.getMobile());
                studentEditResponse.setStreams(student.getStreams());
                studentEditResponse.setBirthDate(student.getBirthDate());
                studentEditResponse.setResume(student.getResume());
                studentEditResponse.setImage(student.getImage());
                studentEditResponse.setProfileSummary(student.getProfileSummary());
                studentEditResponse.setSkills(student.getSkills());
                response.setStudent(studentEditResponse);
            }
        }
        return response;
    }

    public List<JobApplicationResponse> getAllApplications() {
        List<JobApplication> applications = jobApplicationRepository.findAll();
        return applications.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public void deleteApplication(Long id) {
        jobApplicationRepository.deleteById(id);
    }
}
