package com.gympro.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class WorkoutPlanDto {
    private Long id;
    private Long memberId;
    private Long trainerId;
    private String trainerName;
    private String workoutDetails;
    private String dietDetails;
    private LocalDateTime createdAt;
}
