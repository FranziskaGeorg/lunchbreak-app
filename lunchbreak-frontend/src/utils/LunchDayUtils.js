import React from "react";

export function translateLunchday(englishLunchday) {
    switch (englishLunchday) {
        case "monday":
            return "Montag"
        case "tuesday":
            return "Dienstag"
        case "wednesday":
            return "Mittwoch"
        case "thursday":
            return "Donnerstag"
        case "friday":
            return "Freitag"
        default:
            throw new Error("Unexpected week day")
    }
}

export function sortLunchdays(a, b) {
    const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday"];
    return daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b);
}