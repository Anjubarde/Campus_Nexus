package com.campus.model;

import com.campus.entity.User;
import com.campus.enums.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobApplicationResponse {
    private Long applicationId;
    private Long studentRegisterNo;
    private Long jobPostingId;
    private ApplicationStatus status;
    private LocalDateTime appliedAt;
    private LocalDateTime updatedAt;


    private String job_title;
    private String companyName;
    private String job_description;
    private String job_location;
    private String eligibilityCriteria;
    private String company_url;
    private String ctc;
    private boolean isActive;
    private String postedBy;
    private StudentEditResponse student;
}
