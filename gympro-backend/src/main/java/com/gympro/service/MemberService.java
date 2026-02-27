package com.gympro.service;

import com.gympro.dto.AttendanceDto;
import com.gympro.dto.MembershipDto;
import com.gympro.dto.PaymentDto;
import com.gympro.dto.WorkoutPlanDto;
import com.gympro.mapper.AttendanceMapper;
import com.gympro.mapper.MembershipMapper;
import com.gympro.mapper.PaymentMapper;
import com.gympro.mapper.WorkoutPlanMapper;
import com.gympro.repository.AttendanceRepository;
import com.gympro.repository.MembershipRepository;
import com.gympro.repository.PaymentRepository;
import com.gympro.repository.WorkoutPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MemberService {

    @Autowired
    private MembershipRepository membershipRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private MembershipMapper membershipMapper;

    @Autowired
    private PaymentMapper paymentMapper;

    @Autowired
    private WorkoutPlanMapper workoutPlanMapper;

    @Autowired
    private AttendanceMapper attendanceMapper;

    public Optional<MembershipDto> getActiveMembership(Long memberId) {
        return membershipRepository.findByUserId(memberId).stream()
                .filter(m -> m.getEndDate().isAfter(java.time.LocalDate.now()))
                .findFirst()
                .map(membershipMapper::toDto);
    }

    public List<PaymentDto> getMyPayments(Long memberId) {
        return paymentMapper.toDtoList(paymentRepository.findByUserId(memberId));
    }

    public Optional<WorkoutPlanDto> getLatestWorkoutPlan(Long memberId) {
        return workoutPlanRepository.findTopByMemberIdOrderByCreatedAtDesc(memberId)
                .map(workoutPlanMapper::toDto);
    }

    public List<AttendanceDto> getMyAttendance(Long memberId) {
        return attendanceMapper.toDtoList(attendanceRepository.findByMemberId(memberId));
    }
}
