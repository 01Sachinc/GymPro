package com.gympro.controller;

import com.gympro.dto.AttendanceDto;
import com.gympro.dto.WorkoutPlanDto;
import com.gympro.service.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/trainer")
@PreAuthorize("hasRole('TRAINER')")
public class TrainerController {

    @Autowired
    private TrainerService trainerService;

    @PostMapping("/workout-plans")
    public WorkoutPlanDto addWorkoutPlan(@RequestBody WorkoutPlanDto workoutPlanDto) {
        return trainerService.addWorkoutPlan(workoutPlanDto);
    }

    @GetMapping("/workout-plans/{trainerId}")
    public List<WorkoutPlanDto> getMyWorkoutPlans(@PathVariable Long trainerId) {
        return trainerService.getWorkoutPlansByTrainer(trainerId);
    }

    @PostMapping("/attendance")
    public AttendanceDto markAttendance(@RequestBody AttendanceDto attendanceDto) {
        return trainerService.markAttendance(attendanceDto);
    }

    @GetMapping("/attendance/{memberId}")
    public List<AttendanceDto> getMemberAttendance(@PathVariable Long memberId) {
        return trainerService.getAttendanceByMember(memberId);
    }
}
