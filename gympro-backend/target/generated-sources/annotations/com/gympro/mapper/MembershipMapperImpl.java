package com.gympro.mapper;

import com.gympro.dto.MembershipDto;
import com.gympro.entity.Membership;
import com.gympro.entity.Plan;
import com.gympro.entity.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-27T11:02:08+0530",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.12 (Oracle Corporation)"
)
@Component
public class MembershipMapperImpl implements MembershipMapper {

    @Autowired
    private PlanMapper planMapper;

    @Override
    public MembershipDto toDto(Membership membership) {
        if ( membership == null ) {
            return null;
        }

        MembershipDto membershipDto = new MembershipDto();

        membershipDto.setUserId( membershipUserId( membership ) );
        membershipDto.setPlanId( membershipPlanId( membership ) );
        membershipDto.setId( membership.getId() );
        membershipDto.setPlan( planMapper.toDto( membership.getPlan() ) );
        membershipDto.setStartDate( membership.getStartDate() );
        membershipDto.setEndDate( membership.getEndDate() );
        membershipDto.setStatus( membership.getStatus() );

        return membershipDto;
    }

    @Override
    public Membership toEntity(MembershipDto membershipDto) {
        if ( membershipDto == null ) {
            return null;
        }

        Membership.MembershipBuilder membership = Membership.builder();

        membership.user( membershipDtoToUser( membershipDto ) );
        membership.plan( membershipDtoToPlan( membershipDto ) );
        membership.id( membershipDto.getId() );
        membership.startDate( membershipDto.getStartDate() );
        membership.endDate( membershipDto.getEndDate() );
        membership.status( membershipDto.getStatus() );

        return membership.build();
    }

    @Override
    public List<MembershipDto> toDtoList(List<Membership> memberships) {
        if ( memberships == null ) {
            return null;
        }

        List<MembershipDto> list = new ArrayList<MembershipDto>( memberships.size() );
        for ( Membership membership : memberships ) {
            list.add( toDto( membership ) );
        }

        return list;
    }

    private Long membershipUserId(Membership membership) {
        if ( membership == null ) {
            return null;
        }
        User user = membership.getUser();
        if ( user == null ) {
            return null;
        }
        Long id = user.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Long membershipPlanId(Membership membership) {
        if ( membership == null ) {
            return null;
        }
        Plan plan = membership.getPlan();
        if ( plan == null ) {
            return null;
        }
        Long id = plan.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    protected User membershipDtoToUser(MembershipDto membershipDto) {
        if ( membershipDto == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.id( membershipDto.getUserId() );

        return user.build();
    }

    protected Plan membershipDtoToPlan(MembershipDto membershipDto) {
        if ( membershipDto == null ) {
            return null;
        }

        Plan.PlanBuilder plan = Plan.builder();

        plan.id( membershipDto.getPlanId() );

        return plan.build();
    }
}
