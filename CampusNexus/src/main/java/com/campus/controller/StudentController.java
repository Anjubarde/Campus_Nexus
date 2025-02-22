package com.campus.controller;

import com.campus.entity.Student;
import com.campus.model.RegisterStudentReq;
import com.campus.model.StudentEditResponse;
import com.campus.model.StudentResponse;
import com.campus.model.StudentUpdateDto;
import com.campus.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/register")
    public ResponseEntity<?> addStudent(@Valid @RequestBody RegisterStudentReq req) {
        return studentService.addStudent(req);
    }

    @GetMapping("/find/{res_id}")
    public ResponseEntity<StudentResponse> getStudent(@PathVariable Long res_id) {
        return ResponseEntity.ok(studentService.getStudentByRegisterId(res_id));
    }

    @GetMapping("/student-edit/{id}")
    public ResponseEntity<StudentEditResponse> getStudentForEdit(@PathVariable long id) {
        return ResponseEntity.ok(studentService.getFullStudentById(id));
    }

    @GetMapping("/student-data/{id}")
    public ResponseEntity<StudentEditResponse> getStudentAllData(@PathVariable long id) {
        return ResponseEntity.ok(studentService.getFullStudentById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<StudentResponse>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<StudentResponse> updateStudent(@PathVariable long id, @ModelAttribute StudentUpdateDto studentUpdateDto) {
        return ResponseEntity.ok(studentService.updateStudent(id, studentUpdateDto));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }

}
