package com.vertex.common.util;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public final class DateTimeUtils {

    private DateTimeUtils() {}

    public static final ZoneId UTC_ZONE = ZoneId.of("UTC");
    public static final DateTimeFormatter ISO_FORMATTER = DateTimeFormatter.ISO_OFFSET_DATE_TIME;

    public static Instant nowUtc() {
        return Instant.now();
    }

    public static ZonedDateTime toAthleteLocalTime(Instant utcInstant, String athleteTimezone) {
        if (utcInstant == null) return null;
        ZoneId zone = athleteTimezone != null ? ZoneId.of(athleteTimezone) : UTC_ZONE;
        return utcInstant.atZone(zone);
    }

    public static String formatAthleteDate(Instant utcInstant, String athleteTimezone, String pattern) {
        if (utcInstant == null) return "Insufficient data";
        ZonedDateTime zdt = toAthleteLocalTime(utcInstant, athleteTimezone);
        return zdt.format(DateTimeFormatter.ofPattern(pattern));
    }
}
