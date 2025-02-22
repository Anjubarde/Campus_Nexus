package com.campus.services;

import com.campus.entity.Student;
import com.campus.enums.Streams;
import com.campus.model.*;
import com.campus.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.TimeZone;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public ResponseEntity<?> studentAuthentication(LoginRequest loginRequest) {
        Optional<Student> optionalStudent = studentRepository.findByEmail(loginRequest.getEmail());
        if(optionalStudent.isEmpty()) { //no student found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("student not found");
        }
        Student student = optionalStudent.get();
        if(!student.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("invalid password"); //invalid password
        }
        return ResponseEntity.ok(new StudentResponse(student.getId(), student.getRegisterNo(), student.getFullName(), student.getEmail(), student.getMobile(), student.getStreams(), student.getResume(), student.getImage()));
    }

    //create student
    public ResponseEntity<?> addStudent(RegisterStudentReq req) {
        // Check for duplicate register ID
        if (studentRepository.findByRegisterNo(req.getRegister_id()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new UserMessageResponse("register_id", "Register Number is already in use."));
        }
        // Check for duplicate email
        if (studentRepository.findByEmail(req.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new UserMessageResponse("email", "Email is already in use."));
        }
        // Check for duplicate mobile
        if (studentRepository.findByMobile(req.getMobile()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new UserMessageResponse("mobile", "Mobile number is already in use."));
        }

        Student student = new Student();
        student.setRegisterNo(req.getRegister_id());
        student.setFullName(req.getFullName());
        student.setEmail(req.getEmail());
        student.setMobile(req.getMobile());
        student.setPassword(req.getPassword());
        student.setStreams(req.getStreams());
        student.setCreatedAt(new Date());
        student.setUpdatedAt(new Date());
        student =  studentRepository.save(student);
        return ResponseEntity.ok(new UserMessageResponse("success", "Student registered successfully."));
    }

    public StudentResponse getStudentByRegisterId(long id) {
        Student student =studentRepository.findByRegisterNo(id)
                .orElseThrow(() -> new NotFoundException("Student not found with id " + id));
        return new StudentResponse(student.getId(), student.getRegisterNo(), student.getFullName(), student.getEmail(), student.getMobile(), student.getStreams(), student.getResume(), student.getImage());
    }

    public List<StudentResponse> getAllStudents() {
        List<Student> student = studentRepository.findAll();
        return student.stream().map(s -> new StudentResponse(s.getId(), s.getRegisterNo(), s.getFullName(), s.getEmail(), s.getMobile(), s.getStreams(), s.getResume(), s.getImage())).toList();
    }

    public StudentResponse updateStudent(long id, StudentUpdateDto studentUpdateDto) {
        Optional<Student> dbStudent = studentRepository.findById(id);
        Student existingStudent = getStudent(id, studentUpdateDto, dbStudent);
        existingStudent.setUpdatedAt(new Date());
        Student studentRes = studentRepository.save(existingStudent);
        return new StudentResponse(studentRes.getId(), studentRes.getRegisterNo(), studentRes.getFullName(), studentRes.getEmail(), studentRes.getMobile(), studentRes.getStreams(), studentRes.getResume(), studentRes.getImage());
    }

    //method for updating student
    private static Student getStudent(long id, StudentUpdateDto studentUpdateDto, Optional<Student> dbStudent) {
        Student existingStudent = dbStudent.orElseThrow(() -> new NotFoundException("Student not found with id " + id));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        formatter.setTimeZone(TimeZone.getTimeZone("UTC"));
        try {
            existingStudent.setFullName(studentUpdateDto.getFullName());
            existingStudent.setEmail(studentUpdateDto.getEmail());
            existingStudent.setMobile(studentUpdateDto.getMobile());
            existingStudent.setStreams(studentUpdateDto.getStreams());
            existingStudent.setProfileSummary(studentUpdateDto.getProfileSummary());
            existingStudent.setSkills(studentUpdateDto.getSkills());
            existingStudent.setBirthDate(formatter.parse(studentUpdateDto.getBirthDate()));

            if(studentUpdateDto.getImage() != null) {
                existingStudent.setImage(studentUpdateDto.getImage().getBytes());
            }
            if(studentUpdateDto.getResume() != null) {
                existingStudent.setResume(studentUpdateDto.getResume().getBytes());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return existingStudent;
    }

    public void deleteStudent(long id) {
        studentRepository.deleteById(id);
    }

    public StudentEditResponse getFullStudentById(long id) {
        Optional<Student> student = studentRepository.findById(id);
        if(student.isPresent()){
            StudentEditResponse studentEditResponse = new StudentEditResponse();
            studentEditResponse.setId(student.get().getId());
            studentEditResponse.setRegisterNo(student.get().getRegisterNo());
            studentEditResponse.setFullName(student.get().getFullName());
            studentEditResponse.setEmail(student.get().getEmail());
            studentEditResponse.setMobile(student.get().getMobile());
            studentEditResponse.setStreams(student.get().getStreams());
            studentEditResponse.setBirthDate(student.get().getBirthDate());
            studentEditResponse.setResume(student.get().getResume());
            studentEditResponse.setImage(student.get().getImage());
            studentEditResponse.setProfileSummary(student.get().getProfileSummary());
            studentEditResponse.setSkills(student.get().getSkills());
            return studentEditResponse;
        } else {
            throw new NotFoundException("Student not found with id " + id);
        }
    }
}
