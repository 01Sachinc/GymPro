package com.gympro.service;

import com.gympro.dto.PaymentDto;
import com.gympro.entity.Payment;
import com.gympro.entity.User;
import com.gympro.entity.enums.PaymentStatus;
import com.gympro.mapper.PaymentMapper;
import com.gympro.repository.PaymentRepository;
import com.gympro.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PaymentMapper paymentMapper;

    @Autowired
    private UserRepository userRepository;

    public List<PaymentDto> getAllPayments() {
        return paymentMapper.toDtoList(paymentRepository.findAll());
    }

    public List<PaymentDto> getUserPayments(Long userId) {
        return paymentMapper.toDtoList(paymentRepository.findByUserId(userId));
    }

    // Mock implementation for Razorpay payment record
    public PaymentDto recordPayment(Long userId, BigDecimal amount, String razorpayPaymentId, PaymentStatus status) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Payment payment = Payment.builder()
                .user(user)
                .amount(amount)
                .paymentId(razorpayPaymentId)
                .status(status)
                .build();

        return paymentMapper.toDto(paymentRepository.save(payment));
    }
}
