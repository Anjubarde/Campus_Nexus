package com.campus.model;

import com.campus.enums.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}
