package com.gympro.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class AttendanceDto {
    private Long id;
    private Long memberId;
    private LocalDate date;
    private boolean present;
}
