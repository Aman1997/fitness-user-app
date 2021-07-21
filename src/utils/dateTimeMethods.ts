import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInYears,
  addDays,
} from "date-fns";

export function getTimeElapsed(date: string) {
  const dt = Date.parse(date);
  if (differenceInYears(Date.now(), dt) !== 0) {
    return `${differenceInYears(Date.now(), dt)} year ago`;
  } else if (differenceInMonths(Date.now(), dt) !== 0) {
    return `${differenceInMonths(Date.now(), dt)} months ago`;
  } else if (differenceInDays(Date.now(), dt) !== 0) {
    return `${differenceInDays(Date.now(), dt)} days ago`;
  } else if (differenceInHours(Date.now(), dt) !== 0) {
    return `${differenceInHours(Date.now(), dt)} hrs ago`;
  } else {
    return `${differenceInMinutes(Date.now(), dt)} mins ago`;
  }
}

export const getToDate = (type: number) => {
  if (type === 1) return addDays(new Date(), 30);
  if (type === 2) return addDays(new Date(), 90);
  if (type === 3) return addDays(new Date(), 180);
  if (type === 4) return addDays(new Date(), 360);
};

export const formatTimeSlot = (time: string): string => {
  const hour = parseInt(time?.split(":")[0]);
  if (isNaN(hour)) return "";
  if (hour < 12) {
    return `${time} AM`;
  } else if (hour === 12) {
    return `${time} PM`;
  } else {
    const formatedHour = hour - 12;
    return `${formatedHour < 10 ? `0${formatedHour}` : formatedHour}:00 PM`;
  }
};
