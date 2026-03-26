package com.hospital.tracker.dto;

import com.hospital.tracker.entity.WardType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BedAvailabilityRequest {

    @NotBlank
    private String hospitalName;

    @NotNull
    private WardType ward;

    @Min(1)
    @Max(10000)
    private int totalBeds;

    @Min(0)
    @Max(10000)
    private int occupiedBeds;
}
