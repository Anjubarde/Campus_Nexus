package com.campus.entity;

import com.campus.enums.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "job_applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentRegisterNo;

    private Long jobPostingId;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status; // Example: APPLIED, APPROVED, REJECTED

    @Column(nullable = false)
    private LocalDateTime appliedAt; // Timestamp for application

    @Column
    private LocalDateTime updatedAt; // Timestamp for updates
}
