package com.campus.entity;

import com.campus.enums.UserRoles;

import lombok.Data;

import javax.persistence.*;

//for admin and coordinator
@Entity
@Table(name="user")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private UserRoles role;

    private boolean isVarified;

}
