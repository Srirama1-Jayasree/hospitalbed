package com.hospital.tracker.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "bed_availability", uniqueConstraints = {
        @UniqueConstraint(name = "uk_hospital_ward", columnNames = {"hospital_name", "ward"})
})
@Getter
@Setter
@NoArgsConstructor
public class BedAvailability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hospital_name", nullable = false, length = 150)
    private String hospitalName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private WardType ward;

    @Column(name = "total_beds", nullable = false)
    private int totalBeds;

    @Column(name = "occupied_beds", nullable = false)
    private int occupiedBeds;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}
