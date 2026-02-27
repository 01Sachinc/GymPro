package com.gympro.mapper;

import com.gympro.dto.PlanDto;
import com.gympro.entity.Plan;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-27T11:02:08+0530",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.12 (Oracle Corporation)"
)
@Component
public class PlanMapperImpl implements PlanMapper {

    @Override
    public PlanDto toDto(Plan plan) {
        if ( plan == null ) {
            return null;
        }

        PlanDto planDto = new PlanDto();

        planDto.setId( plan.getId() );
        planDto.setPlanName( plan.getPlanName() );
        planDto.setPrice( plan.getPrice() );
        planDto.setDurationDays( plan.getDurationDays() );
        planDto.setDescription( plan.getDescription() );

        return planDto;
    }

    @Override
    public Plan toEntity(PlanDto planDto) {
        if ( planDto == null ) {
            return null;
        }

        Plan.PlanBuilder plan = Plan.builder();

        plan.id( planDto.getId() );
        plan.planName( planDto.getPlanName() );
        plan.price( planDto.getPrice() );
        plan.durationDays( planDto.getDurationDays() );
        plan.description( planDto.getDescription() );

        return plan.build();
    }

    @Override
    public List<PlanDto> toDtoList(List<Plan> plans) {
        if ( plans == null ) {
            return null;
        }

        List<PlanDto> list = new ArrayList<PlanDto>( plans.size() );
        for ( Plan plan : plans ) {
            list.add( toDto( plan ) );
        }

        return list;
    }
}
