package com.gympro.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class PlanDto {
    private Long id;
    private String planName;
    private BigDecimal price;
    private Integer durationDays;
    private String description;
}
