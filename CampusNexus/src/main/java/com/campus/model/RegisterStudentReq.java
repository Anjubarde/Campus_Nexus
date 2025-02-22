package com.campus.model;

import com.campus.enums.Streams;
import lombok.Data;

import javax.validation.constraints.*;

@Data
public class RegisterStudentReq {

    @NotNull(message = "Registration ID is required")
    private Long register_id;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotNull(message = "Mobile number is required")
    @Digits(integer = 10, fraction = 0, message = "Mobile number must be 10 digits")
    private Long mobile;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

    @NotNull(message = "Stream is required")
    private Streams streams;


}
