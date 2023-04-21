package com.levin.backend.flatmate.model;

import java.util.List;

public record EatingHabits(
        boolean vegetarian,
        boolean vegan,
        List<String> likes,
        List<String> dislikes,
        List<String> allergies
) {
}
