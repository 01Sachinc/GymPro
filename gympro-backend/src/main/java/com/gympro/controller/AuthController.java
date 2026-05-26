package com.gympro.controller;

import com.gympro.dto.SignupRequest;
import com.gympro.entity.User;
import com.gympro.entity.enums.Role;
import com.gympro.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(
            @RequestBody SignupRequest signUpRequest
    ) {

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {

            return ResponseEntity
                    .badRequest()
                    .body("Error: Email already exists!");
        }

        User user = new User();

        user.setName(signUpRequest.getName());

        user.setEmail(signUpRequest.getEmail());

        user.setPhone(signUpRequest.getPhone());

        user.setPassword(
                encoder.encode(signUpRequest.getPassword())
        );

        // DEFAULT ROLE
        user.setRole(Role.MEMBER);

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }
}
