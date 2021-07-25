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
