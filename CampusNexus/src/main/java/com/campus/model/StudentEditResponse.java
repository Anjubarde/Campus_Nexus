package com.campus.model;

import com.campus.enums.Streams;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Lob;
import javax.validation.constraints.Digits;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentEditResponse {
    private Long id;
    private Long registerNo;
    private String fullName;
    private String email;
    private Long mobile;
    private Date birthDate;
    private Streams streams;
    private byte[] resume;
    private byte[] image;
    private String profileSummary;
    private String skills;
}
