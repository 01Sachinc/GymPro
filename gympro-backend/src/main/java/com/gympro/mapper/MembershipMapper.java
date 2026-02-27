package com.gympro.mapper;

import com.gympro.dto.MembershipDto;
import com.gympro.entity.Membership;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", uses = { PlanMapper.class }, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MembershipMapper {
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "plan.id", target = "planId")
    MembershipDto toDto(Membership membership);

    @Mapping(source = "userId", target = "user.id")
    @Mapping(source = "planId", target = "plan.id")
    Membership toEntity(MembershipDto membershipDto);

    List<MembershipDto> toDtoList(List<Membership> memberships);
}
