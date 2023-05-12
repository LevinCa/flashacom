package com.levin.backend.cleaning_roster.model;

public record ImageProperties(
        int index,
        int hue,
        int brightness,
        boolean isInverted,
        boolean isBlackAndWhite,
        boolean isOverSaturated
) {
}
