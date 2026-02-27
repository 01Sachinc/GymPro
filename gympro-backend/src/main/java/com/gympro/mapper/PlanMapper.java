package com.gympro.mapper;

import com.gympro.dto.PlanDto;
import com.gympro.entity.Plan;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PlanMapper {
    PlanDto toDto(Plan plan);

    Plan toEntity(PlanDto planDto);

    List<PlanDto> toDtoList(List<Plan> plans);
}
