package com.gympro.config;

import com.gympro.entity.Plan;
import com.gympro.entity.User;
import com.gympro.entity.enums.Role;
import com.gympro.repository.PlanRepository;
import com.gympro.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlanRepository planRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Seed default plans
        if (planRepository.count() == 0) {
            planRepository.save(Plan.builder()
                    .planName("Basic Starter")
                    .price(new BigDecimal("29.99"))
                    .durationDays(30)
                    .description("Essential gym access, cardio, and basic equipment access.")
                    .build());

            planRepository.save(Plan.builder()
                    .planName("Premium Pro")
                    .price(new BigDecimal("59.99"))
                    .durationDays(30)
                    .description("All gym access, personal trainer guidance, and AI customized plans.")
                    .build());

            planRepository.save(Plan.builder()
                    .planName("Elite Annual")
                    .price(new BigDecimal("499.99"))
                    .durationDays(365)
                    .description("Luxury full-year access, VIP perks, personal locker, and nutritional plan.")
                    .build());
        }

        // Seed default Admin
        if (!userRepository.existsByEmail("admin@gympro.com")) {
            userRepository.save(User.builder()
                    .name("Admin System")
                    .email("admin@gympro.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .phone("1112223333")
                    .build());
        }

        // Seed default Trainer
        if (!userRepository.existsByEmail("trainer@gympro.com")) {
            userRepository.save(User.builder()
                    .name("Coach Mike")
                    .email("trainer@gympro.com")
                    .password(passwordEncoder.encode("trainer123"))
                    .role(Role.TRAINER)
                    .phone("2223334444")
                    .build());
        }

        // Seed default Member
        if (!userRepository.existsByEmail("member@gympro.com")) {
            userRepository.save(User.builder()
                    .name("John Doe")
                    .email("member@gympro.com")
                    .password(passwordEncoder.encode("member123"))
                    .role(Role.MEMBER)
                    .phone("5556667777")
                    .build());
        }
    }
}
