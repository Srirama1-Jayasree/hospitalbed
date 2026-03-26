package com.hospital.tracker.service;

import com.hospital.tracker.dto.BedAvailabilityRequest;
import com.hospital.tracker.dto.BedAvailabilityResponse;
import com.hospital.tracker.entity.BedAvailability;
import com.hospital.tracker.entity.WardType;
import com.hospital.tracker.repository.BedAvailabilityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BedAvailabilityService {

    private final BedAvailabilityRepository repository;

    public List<BedAvailabilityResponse> listAll(WardType ward) {
        List<BedAvailability> data = ward == null
                ? repository.findAllByOrderByUpdatedAtDesc()
                : repository.findByWardOrderByUpdatedAtDesc(ward);

        return data.stream().map(this::mapToResponse).toList();
    }

    @Transactional
    public BedAvailabilityResponse createOrUpdate(BedAvailabilityRequest request) {
        if (request.getOccupiedBeds() > request.getTotalBeds()) {
            throw new IllegalArgumentException("Occupied beds cannot be greater than total beds");
        }

        BedAvailability bed = repository.findByHospitalNameAndWard(
                        request.getHospitalName().trim(),
                        request.getWard())
                .orElseGet(BedAvailability::new);

        bed.setHospitalName(request.getHospitalName().trim());
        bed.setWard(request.getWard());
        bed.setTotalBeds(request.getTotalBeds());
        bed.setOccupiedBeds(request.getOccupiedBeds());
        bed.setUpdatedAt(Instant.now());

        BedAvailability saved = repository.save(bed);
        return mapToResponse(saved);
    }

    private BedAvailabilityResponse mapToResponse(BedAvailability bed) {
        int available = Math.max(bed.getTotalBeds() - bed.getOccupiedBeds(), 0);

        return BedAvailabilityResponse.builder()
                .id(bed.getId())
                .hospitalName(bed.getHospitalName())
                .ward(bed.getWard())
                .totalBeds(bed.getTotalBeds())
                .occupiedBeds(bed.getOccupiedBeds())
                .availableBeds(available)
                .updatedAt(bed.getUpdatedAt())
                .build();
    }
}
