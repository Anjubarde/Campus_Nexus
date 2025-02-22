package com.campus.model;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
public class JobPostingResponse {
    private Long id;
    private String job_title;
    private String job_description;
    private String companyName;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String job_location;
    private String eligibilityCriteria;
    private String company_url;
    private String ctc;
    private boolean isActive;
    private String postedByName;
}
