package com.campus.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "job_postings")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobPosting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String job_title;

    @Column(nullable = false)
    private String companyName;
    
    @Column(nullable = false)
    private String job_description;
    
    private String job_location;
    
    private String eligibilityCriteria;
    
    private String company_url;
    
    private String ctc;

    @Column(nullable = false)
    private LocalDateTime startDate;

    @Column(nullable = false)
    private LocalDateTime endDate;

    @Column(nullable = false)
    private boolean isActive;

    @ManyToOne
    @JoinColumn(name = "posted_by_id", nullable = false)
    private User postedBy; // References the coordinator/admin who posted the job
}
