package com.gympro.repository;

import com.gympro.entity.WorkoutPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface WorkoutPlanRepository extends JpaRepository<WorkoutPlan, Long> {
    List<WorkoutPlan> findByMemberId(Long memberId);

    List<WorkoutPlan> findByTrainerId(Long trainerId);

    Optional<WorkoutPlan> findTopByMemberIdOrderByCreatedAtDesc(Long memberId);
}
