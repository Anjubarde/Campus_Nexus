package com.campus.entity;

import com.campus.enums.Streams;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import java.util.Date;

@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long registerNo;
    private String fullName;
    @Column(unique = true)
    private String email;

    @Column(unique = true)
    @Digits(integer = 10, fraction = 0, message = "Mobile number must be 10 digits")
    private Long mobile;

    private String password;

    @Enumerated(EnumType.STRING)
    private Streams streams;

    private Date birthDate;

    //resume
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] resume;

    //profile image
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;

    private String profileSummary;
    private String skills;

    private Date createdAt;
    private Date updatedAt;
}
