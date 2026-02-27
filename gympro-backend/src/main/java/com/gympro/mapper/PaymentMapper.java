package com.gympro.mapper;

import com.gympro.dto.PaymentDto;
import com.gympro.entity.Payment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PaymentMapper {
    @Mapping(source = "user.id", target = "userId")
    PaymentDto toDto(Payment payment);

    @Mapping(source = "userId", target = "user.id")
    Payment toEntity(PaymentDto paymentDto);

    List<PaymentDto> toDtoList(List<Payment> payments);
}
