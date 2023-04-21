package com.levin.backend.flatmate;

import com.levin.backend.flatmate.model.Availability;
import com.levin.backend.flatmate.model.Contact;
import com.levin.backend.flatmate.model.EatingHabits;
import jakarta.validation.constraints.*;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;

public record Flatmate(
        @Id
        String id,
        @NotBlank
        String firstName,
        @NotBlank
        String lastName,
        @NotNull
        LocalDate dateOfBirth,
        EatingHabits eatingHabits,
        Contact contact,
        Availability availability
) {
}
