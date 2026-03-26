package com.hospital.tracker.repository;

import com.hospital.tracker.entity.BedAvailability;
import com.hospital.tracker.entity.WardType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BedAvailabilityRepository extends JpaRepository<BedAvailability, Long> {
    List<BedAvailability> findAllByOrderByUpdatedAtDesc();

    List<BedAvailability> findByWardOrderByUpdatedAtDesc(WardType ward);

    Optional<BedAvailability> findByHospitalNameAndWard(String hospitalName, WardType ward);
}
