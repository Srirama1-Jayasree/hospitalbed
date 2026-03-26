package com.hospital.tracker.controller;

import com.hospital.tracker.dto.BedAvailabilityRequest;
import com.hospital.tracker.dto.BedAvailabilityResponse;
import com.hospital.tracker.entity.WardType;
import com.hospital.tracker.service.BedAvailabilityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/beds")
@RequiredArgsConstructor
public class BedAvailabilityController {

    private final BedAvailabilityService bedAvailabilityService;

    @GetMapping
    public ResponseEntity<List<BedAvailabilityResponse>> getBeds(
            @RequestParam(required = false) WardType ward
    ) {
        return ResponseEntity.ok(bedAvailabilityService.listAll(ward));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<BedAvailabilityResponse> upsert(@Valid @RequestBody BedAvailabilityRequest request) {
        return ResponseEntity.ok(bedAvailabilityService.createOrUpdate(request));
    }
}
