package com.gympro.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "plans")
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String planName;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer durationDays;

    @Column(length = 500)
    private String description;
}
