package com.gympro.service;

import com.gympro.dto.PlanDto;
import com.gympro.entity.Plan;
import com.gympro.mapper.PlanMapper;
import com.gympro.repository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PlanService {

    @Autowired
    private PlanRepository planRepository;

    @Autowired
    private PlanMapper planMapper;

    public List<PlanDto> getAllPlans() {
        return planMapper.toDtoList(planRepository.findAll());
    }

    public PlanDto getPlanById(Long id) {
        Plan plan = planRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plan not found with id: " + id));
        return planMapper.toDto(plan);
    }

    public PlanDto createPlan(PlanDto planDto) {
        Plan plan = planMapper.toEntity(planDto);
        return planMapper.toDto(planRepository.save(plan));
    }

    public PlanDto updatePlan(Long id, PlanDto planDto) {
        Plan plan = planRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plan not found with id: " + id));

        plan.setPlanName(planDto.getPlanName());
        plan.setPrice(planDto.getPrice());
        plan.setDurationDays(planDto.getDurationDays());
        plan.setDescription(planDto.getDescription());

        return planMapper.toDto(planRepository.save(plan));
    }

    public void deletePlan(Long id) {
        if (!planRepository.existsById(id)) {
            throw new RuntimeException("Plan not found with id: " + id);
        }
        planRepository.deleteById(id);
    }
}
