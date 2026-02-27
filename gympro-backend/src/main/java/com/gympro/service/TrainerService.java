package com.gympro.service;

import com.gympro.dto.AttendanceDto;
import com.gympro.dto.WorkoutPlanDto;
import com.gympro.entity.Attendance;
import com.gympro.entity.WorkoutPlan;
import com.gympro.mapper.AttendanceMapper;
import com.gympro.mapper.WorkoutPlanMapper;
import com.gympro.repository.AttendanceRepository;
import com.gympro.repository.UserRepository;
import com.gympro.repository.WorkoutPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TrainerService {

    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private WorkoutPlanMapper workoutPlanMapper;

    @Autowired
    private AttendanceMapper attendanceMapper;

    public WorkoutPlanDto addWorkoutPlan(WorkoutPlanDto workoutPlanDto) {
        WorkoutPlan workoutPlan = workoutPlanMapper.toEntity(workoutPlanDto);
        return workoutPlanMapper.toDto(workoutPlanRepository.save(workoutPlan));
    }

    public List<WorkoutPlanDto> getWorkoutPlansByTrainer(Long trainerId) {
        return workoutPlanMapper.toDtoList(workoutPlanRepository.findByTrainerId(trainerId));
    }

    public AttendanceDto markAttendance(AttendanceDto attendanceDto) {
        Attendance attendance = attendanceMapper.toEntity(attendanceDto);
        return attendanceMapper.toDto(attendanceRepository.save(attendance));
    }

    public List<AttendanceDto> getAttendanceByMember(Long memberId) {
        return attendanceMapper.toDtoList(attendanceRepository.findByMemberId(memberId));
    }
}
