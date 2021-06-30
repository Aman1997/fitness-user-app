import {
  isBefore,
  subDays,
  startOfDay,
  startOfMonth,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
} from "date-fns";

export function isBeforeDay(day: Date) {
  return isBefore(day, startOfDay(new Date()));
}

export function isSelectedDay(generatedDay: Date, selectedDay: Date) {
  return isSameDay(generatedDay, selectedDay);
}

export function isSameMonthDate(day: Date) {
  return isSameMonth(day, startOfDay(new Date()));
}

export function subtractDays(day: Date) {
  return subDays(startOfMonth(day), 1);
}

export function addToDays(day: Date) {
  return addDays(endOfMonth(day), 1);
}
