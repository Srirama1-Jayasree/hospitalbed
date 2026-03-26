package com.hospital.tracker.dto;

import com.hospital.tracker.entity.WardType;
import lombok.Builder;
import lombok.Getter;

import java.time.Instant;

@Getter
@Builder
public class BedAvailabilityResponse {
    private Long id;
    private String hospitalName;
    private WardType ward;
    private int totalBeds;
    private int occupiedBeds;
    private int availableBeds;
    private Instant updatedAt;
}
