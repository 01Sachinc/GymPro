package com.gympro.mapper;

import com.gympro.dto.PaymentDto;
import com.gympro.entity.Payment;
import com.gympro.entity.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-27T11:02:07+0530",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.12 (Oracle Corporation)"
)
@Component
public class PaymentMapperImpl implements PaymentMapper {

    @Override
    public PaymentDto toDto(Payment payment) {
        if ( payment == null ) {
            return null;
        }

        PaymentDto paymentDto = new PaymentDto();

        paymentDto.setUserId( paymentUserId( payment ) );
        paymentDto.setId( payment.getId() );
        paymentDto.setAmount( payment.getAmount() );
        paymentDto.setPaymentId( payment.getPaymentId() );
        paymentDto.setStatus( payment.getStatus() );
        paymentDto.setCreatedAt( payment.getCreatedAt() );

        return paymentDto;
    }

    @Override
    public Payment toEntity(PaymentDto paymentDto) {
        if ( paymentDto == null ) {
            return null;
        }

        Payment.PaymentBuilder payment = Payment.builder();

        payment.user( paymentDtoToUser( paymentDto ) );
        payment.id( paymentDto.getId() );
        payment.amount( paymentDto.getAmount() );
        payment.paymentId( paymentDto.getPaymentId() );
        payment.status( paymentDto.getStatus() );
        payment.createdAt( paymentDto.getCreatedAt() );

        return payment.build();
    }

    @Override
    public List<PaymentDto> toDtoList(List<Payment> payments) {
        if ( payments == null ) {
            return null;
        }

        List<PaymentDto> list = new ArrayList<PaymentDto>( payments.size() );
        for ( Payment payment : payments ) {
            list.add( toDto( payment ) );
        }

        return list;
    }

    private Long paymentUserId(Payment payment) {
        if ( payment == null ) {
            return null;
        }
        User user = payment.getUser();
        if ( user == null ) {
            return null;
        }
        Long id = user.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    protected User paymentDtoToUser(PaymentDto paymentDto) {
        if ( paymentDto == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.id( paymentDto.getUserId() );

        return user.build();
    }
}
