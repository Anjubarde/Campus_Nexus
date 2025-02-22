package com.campus.model;

import com.campus.enums.Streams;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentUpdateDto {
    private Long id;
    private Long registerNo;
    private String fullName;
    private String email;
    private Long mobile;
    private String birthDate;
    private Streams streams;
    private MultipartFile resume;
    private MultipartFile image;
    private String profileSummary;
    private String skills;
}
