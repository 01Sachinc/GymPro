package com.gympro.controller;

import com.gympro.dto.SignupRequest;
import com.gympro.dto.request.LoginRequest;
import com.gympro.dto.response.JwtResponse;
import com.gympro.entity.User;
import com.gympro.entity.enums.Role;
import com.gympro.repository.UserRepository;
import com.gympro.security.JwtUtils;
import com.gympro.security.UserDetailsImpl;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String role = userDetails.getAuthorities().stream()
                .findFirst()
                .map(item -> item.getAuthority())
                .orElse("ROLE_MEMBER");

        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getName(),
                userDetails.getEmail(),
                role
        ));
    }

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
