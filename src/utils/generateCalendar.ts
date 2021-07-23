import {
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  startOfDay,
  addDays,
} from "date-fns";

function takeWeek(start = new Date()) {
  let date = startOfWeek(startOfDay(start));

  return function () {
    const week = [...Array(7)].map((_, i) => addDays(date, i));
    date = addDays(week[6], 1);
    return week;
  };
}

export default function takeMonth(start = new Date()) {
  let month: Array<Array<Date>> = [];
  let date = start;

  function lastDayOfRange(range: Array<Array<Date>>) {
    return range[range.length - 1][6];
  }

  return function () {
    const weekGenerator = takeWeek(startOfMonth(date));
    const endDate = startOfDay(endOfWeek(endOfMonth(date)));
    month.push(weekGenerator());

    while (lastDayOfRange(month) < endDate) {
      month.push(weekGenerator());
    }

    const range = month;
    month = [];
    date = addDays(lastDayOfRange(range), 1);

    return range;
  };
}

// generating a 2d array for time slots
export const generateTimeSlots = (availableSlots: Array<string>) => {
  const arrays = [];
  const size = 4;
  const tSlot = [...availableSlots];
  while (tSlot.length > 0) arrays.push(tSlot.splice(0, size));
  return arrays;
};

// checking if time slot has been selected
export const isSameTimeSlot = (
  selectedTimeSlot: string | null,
  timeSlot: string,
) => {
  return selectedTimeSlot === timeSlot;
};

// checking if the time slot
export const isBeforeTimeSlot = (timeSlot: string, start: Date) => {
  return (
    new Date().getHours() >= parseInt(timeSlot.split(":")[0]) &&
    new Date() > start
  );
};

export const getTimeSlotArray = (
  starting: string,
  ending: string,
): Array<string> => {
  const startTime = Number(starting.split(":")[0]);
  const endTime = Number(ending.split(":")[0]);

  let reqdArr = [];

  if (startTime === endTime - 1) {
    if (startTime < 10) {
      reqdArr.push(`0${startTime}:00`);
    } else {
      reqdArr.push(`${startTime}:00`);
    }
  } else {
    for (let i = 0; i < endTime - startTime - 1; i++) {
      if (startTime + i < 10) {
        reqdArr.push(`0${startTime + i}:00`);
      } else {
        reqdArr.push(`${startTime + i}:00`);
      }
    }
  }

  return reqdArr;
};
