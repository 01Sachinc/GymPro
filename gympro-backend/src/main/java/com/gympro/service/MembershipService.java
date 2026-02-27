package com.gympro.service;

import com.gympro.dto.MembershipDto;
import com.gympro.entity.Membership;
import com.gympro.entity.Plan;
import com.gympro.entity.User;
import com.gympro.entity.enums.MembershipStatus;
import com.gympro.mapper.MembershipMapper;
import com.gympro.repository.MembershipRepository;
import com.gympro.repository.PlanRepository;
import com.gympro.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class MembershipService {

    @Autowired
    private MembershipRepository membershipRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlanRepository planRepository;

    @Autowired
    private MembershipMapper membershipMapper;

    public List<MembershipDto> getAllMemberships() {
        return membershipMapper.toDtoList(membershipRepository.findAll());
    }

    public List<MembershipDto> getUserMemberships(Long userId) {
        return membershipMapper.toDtoList(membershipRepository.findByUserId(userId));
    }

    public MembershipDto activateMembership(Long userId, Long planId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Plan plan = planRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        Membership membership = Membership.builder()
                .user(user)
                .plan(plan)
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusDays(plan.getDurationDays()))
                .status(MembershipStatus.ACTIVE)
                .build();

        return membershipMapper.toDto(membershipRepository.save(membership));
    }

    public void checkAndDeactivateExpiredMemberships() {
        List<Membership> activeMemberships = membershipRepository.findAll().stream()
                .filter(m -> m.getStatus() == MembershipStatus.ACTIVE)
                .toList();

        LocalDate today = LocalDate.now();
        for (Membership m : activeMemberships) {
            if (m.getEndDate().isBefore(today)) {
                m.setStatus(MembershipStatus.EXPIRED);
                membershipRepository.save(m);
            }
        }
    }
}
