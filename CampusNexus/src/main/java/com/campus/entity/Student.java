package com.campus.entity;

import com.campus.enums.Streams;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Digits;

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

    //resume
    @Lob
    private byte[] resume;

    //profile image
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;


}
