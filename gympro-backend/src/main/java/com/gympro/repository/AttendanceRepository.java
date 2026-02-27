package com.gympro.repository;

import com.gympro.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByMemberId(Long memberId);

    List<Attendance> findByMemberIdAndDate(Long memberId, LocalDate date);
}
