package com.gympro.service;

import com.gympro.dto.UserDto;
import com.gympro.entity.User;
import com.gympro.entity.enums.Role;
import com.gympro.mapper.UserMapper;
import com.gympro.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    public List<UserDto> getAllUsers() {
        return userMapper.toDtoList(userRepository.findAll());
    }

    public List<UserDto> getUsersByRole(Role role) {
        List<User> users = userRepository.findAll().stream()
                .filter(u -> u.getRole() == role)
                .collect(Collectors.toList());
        return userMapper.toDtoList(users);
    }

    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found: " + id));
        return userMapper.toDto(user);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found: " + id);
        }
        userRepository.deleteById(id);
    }

    public UserDto updateUser(Long id, UserDto userDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found: " + id));

        user.setName(userDto.getName());
        user.setPhone(userDto.getPhone());

        return userMapper.toDto(userRepository.save(user));
    }
}
