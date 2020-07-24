package de.lunchbreakapp.lunchbreakbackend.utils;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

@Service
public class DateUtils {

    public String formatCurrentDate() {
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofLocalizedDate(FormatStyle.MEDIUM); // Style: 31.01.2016
        return currentDate.format(formatter);
    }

}
