package com.gympro.mapper;

import com.gympro.dto.AttendanceDto;
import com.gympro.entity.Attendance;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AttendanceMapper {
    @Mapping(source = "member.id", target = "memberId")
    AttendanceDto toDto(Attendance attendance);

    @Mapping(source = "memberId", target = "member.id")
    Attendance toEntity(AttendanceDto attendanceDto);

    List<AttendanceDto> toDtoList(List<Attendance> attendances);
}
