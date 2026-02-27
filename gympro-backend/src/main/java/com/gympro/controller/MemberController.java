package com.gympro.controller;

import com.gympro.dto.AttendanceDto;
import com.gympro.dto.MembershipDto;
import com.gympro.dto.PaymentDto;
import com.gympro.dto.WorkoutPlanDto;
import com.gympro.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/member")
@PreAuthorize("hasRole('MEMBER')")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @GetMapping("/membership/{memberId}")
    public ResponseEntity<MembershipDto> getActiveMembership(@PathVariable Long memberId) {
        return memberService.getActiveMembership(memberId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/payments/{memberId}")
    public List<PaymentDto> getMyPayments(@PathVariable Long memberId) {
        return memberService.getMyPayments(memberId);
    }

    @GetMapping("/workout-plan/{memberId}")
    public ResponseEntity<WorkoutPlanDto> getLatestWorkoutPlan(@PathVariable Long memberId) {
        return memberService.getLatestWorkoutPlan(memberId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/attendance/{memberId}")
    public List<AttendanceDto> getMyAttendance(@PathVariable Long memberId) {
        return memberService.getMyAttendance(memberId);
    }
}
