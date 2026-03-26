package com.hospital.tracker.config;

import com.hospital.tracker.entity.BedAvailability;
import com.hospital.tracker.entity.Role;
import com.hospital.tracker.entity.User;
import com.hospital.tracker.entity.WardType;
import com.hospital.tracker.repository.BedAvailabilityRepository;
import com.hospital.tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BedAvailabilityRepository bedRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedUser("admin@hospital.com", "Admin@123", Role.ROLE_ADMIN);
        seedUser("user@hospital.com", "User@123", Role.ROLE_USER);

        if (bedRepository.count() == 0) {
            seedBed("City General Hospital", WardType.GENERAL, 120, 80);
            seedBed("City General Hospital", WardType.ICU, 30, 25);
            seedBed("Metro Emergency Center", WardType.EMERGENCY, 50, 35);
        }
    }

    private void seedUser(String email, String password, Role role) {
        if (userRepository.existsByEmail(email)) {
            return;
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(role);
        userRepository.save(user);
    }

    private void seedBed(String hospitalName, WardType ward, int totalBeds, int occupiedBeds) {
        BedAvailability bed = new BedAvailability();
        bed.setHospitalName(hospitalName);
        bed.setWard(ward);
        bed.setTotalBeds(totalBeds);
        bed.setOccupiedBeds(occupiedBeds);
        bed.setUpdatedAt(Instant.now());
        bedRepository.save(bed);
    }
}
