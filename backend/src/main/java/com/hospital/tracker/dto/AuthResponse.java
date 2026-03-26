package com.hospital.tracker.dto;

import com.hospital.tracker.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String email;
    private Role role;
}
