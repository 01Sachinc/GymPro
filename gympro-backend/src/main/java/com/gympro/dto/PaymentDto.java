package com.gympro.dto;

import com.gympro.entity.enums.PaymentStatus;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class PaymentDto {
    private Long id;
    private Long userId;
    private BigDecimal amount;
    private String paymentId;
    private PaymentStatus status;
    private LocalDateTime createdAt;
}
