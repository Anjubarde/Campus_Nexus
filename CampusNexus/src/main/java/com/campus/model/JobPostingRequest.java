package com.campus.model;

import com.campus.entity.User;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
public class JobPostingRequest {

    @NotBlank(message = "Job title is required")
    private String job_title;

    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "Job description is required")
    private String job_description;

    @NotNull(message = "Start date is required")
    private LocalDateTime startDate;

    @NotNull(message = "End date is required")
    private LocalDateTime endDate;

    private String job_location;

    private String eligibilityCriteria;

    private String company_url;

    private String ctc;

    private boolean active;

}
