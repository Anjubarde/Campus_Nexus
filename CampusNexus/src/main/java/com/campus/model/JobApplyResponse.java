package com.campus.model;

import com.campus.enums.ApplicationStatus;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
public class JobApplyResponse {
    private Long id;
    private Long studentRegisterNo;
    private Long jobPostingId;
    private ApplicationStatus status; // Example: APPLIED, APPROVED, REJECTED
    private LocalDateTime appliedAt; // Timestamp for application
    private LocalDateTime updatedAt; // Timestamp for updates
    private String reasonForRejection;
    private boolean success;
}
