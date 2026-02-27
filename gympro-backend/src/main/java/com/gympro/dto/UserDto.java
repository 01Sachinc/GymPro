package com.gympro.dto;

import com.gympro.entity.enums.Role;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private String phone;
    private LocalDateTime createdAt;
}
