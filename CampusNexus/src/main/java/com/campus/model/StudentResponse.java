package com.campus.model;

import com.campus.enums.Streams;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class StudentResponse {
    private Long id;
    private Long register_id;
    private String fullName;
    private String email;
    private Long mobile;
    private Streams streams;
    private byte[] resume;
    private byte[] image;
}
