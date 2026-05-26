package com.gympro.mapper;

import com.gympro.dto.WorkoutPlanDto;
import com.gympro.entity.WorkoutPlan;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface WorkoutPlanMapper {
    @Mapping(source = "member.id", target = "memberId")
    @Mapping(source = "trainer.id", target = "trainerId")
    @Mapping(source = "trainer.name", target = "trainerName")
    WorkoutPlanDto toDto(WorkoutPlan workoutPlan);

    @Mapping(source = "memberId", target = "member.id")
    @Mapping(source = "trainerId", target = "trainer.id")
    WorkoutPlan toEntity(WorkoutPlanDto workoutPlanDto);

    List<WorkoutPlanDto> toDtoList(List<WorkoutPlan> workoutPlans);
}
