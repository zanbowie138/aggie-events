/**
 * Checks if two dates fall on the same day.
 *
 * @param {Date} date1 - The first date to compare.
 * @param {Date} date2 - The second date to compare.
 * @returns {boolean} - Returns true if both dates are on the same day, otherwise false.
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Formats a date interval into a readable string.
 *
 * @param {Date} start - The start date and time.
 * @param {Date} end - The end date and time.
 * @returns {string} - A formatted string representing the date interval.
 * @example "Monday, January 1, 12:00 PM - 1:00 PM"
 * @example "Monday, January 1, 12:00 PM - Tuesday, January 2, 1:00 PM"
 */
export function formatDateInterval(start: Date, end: Date): string {
  const startDayStr = start.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  const endDayStr = end.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  const startTimeStr = start.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  const endTimeStr = end.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  if (isSameDay(start, end)) {
    return `${startDayStr}, ${startYear}, ${startTimeStr} - ${endTimeStr}`;
  } else {
    return `${startDayStr}, ${startYear}, ${startTimeStr} - ${endDayStr}, ${startYear !== endYear ? endYear + "," : ""} ${endTimeStr}`;
  }
}

export const formatTimeInterval = (start: Date, end: Date): string => {
  // const startDayStr = start.toLocaleDateString("en-US", {
  //   weekday: "long",
  //   month: "long",
  //   day: "numeric",
  // });
  // const endDayStr = end.toLocaleDateString("en-US", {
  //   weekday: "long",
  //   month: "long",
  //   day: "numeric",
  // });
  const startTimeStr = start.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  const endTimeStr = end.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${startTimeStr} - ${endTimeStr}`;
};
