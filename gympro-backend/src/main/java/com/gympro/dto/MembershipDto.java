package com.gympro.dto;

import com.gympro.entity.enums.MembershipStatus;
import lombok.Data;
import java.time.LocalDate;

@Data
public class MembershipDto {
    private Long id;
    private Long userId;
    private Long planId;
    private PlanDto plan;
    private LocalDate startDate;
    private LocalDate endDate;
    private MembershipStatus status;
}
