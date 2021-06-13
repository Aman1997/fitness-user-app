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

export function isBeforeDay(day) {
  return isBefore(day, startOfDay(new Date()));
}

export function isSelectedDay(generatedDay, selectedDay) {
  return isSameDay(generatedDay, selectedDay);
}

export function isSameMonthDate(day) {
  return isSameMonth(day, startOfDay(new Date()));
}

export function subtractDays(day) {
  return subDays(startOfMonth(day), 1);
}

export function addToDays(day) {
  return addDays(endOfMonth(day), 1);
}
