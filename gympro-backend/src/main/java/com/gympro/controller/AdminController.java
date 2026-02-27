package com.gympro.controller;

import com.gympro.dto.MembershipDto;
import com.gympro.dto.PaymentDto;
import com.gympro.dto.PlanDto;
import com.gympro.dto.UserDto;
import com.gympro.entity.enums.Role;
import com.gympro.service.MembershipService;
import com.gympro.service.PaymentService;
import com.gympro.service.PlanService;
import com.gympro.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private PlanService planService;

    @Autowired
    private MembershipService membershipService;

    @Autowired
    private PaymentService paymentService;

    // --- User Management ---
    @GetMapping("/users")
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/members")
    public List<UserDto> getMembers() {
        return userService.getUsersByRole(Role.MEMBER);
    }

    @GetMapping("/trainers")
    public List<UserDto> getTrainers() {
        return userService.getUsersByRole(Role.TRAINER);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().body("User deleted successfully.");
    }

    // --- Plan Management ---
    @PostMapping("/plans")
    public PlanDto createPlan(@RequestBody PlanDto planDto) {
        return planService.createPlan(planDto);
    }

    @PutMapping("/plans/{id}")
    public PlanDto updatePlan(@PathVariable Long id, @RequestBody PlanDto planDto) {
        return planService.updatePlan(id, planDto);
    }

    @DeleteMapping("/plans/{id}")
    public ResponseEntity<?> deletePlan(@PathVariable Long id) {
        planService.deletePlan(id);
        return ResponseEntity.ok().body("Plan deleted successfully.");
    }

    // --- Analytics / View All ---
    @GetMapping("/memberships")
    public List<MembershipDto> getAllMemberships() {
        return membershipService.getAllMemberships();
    }

    @GetMapping("/payments")
    public List<PaymentDto> getAllPayments() {
        return paymentService.getAllPayments();
    }
}
