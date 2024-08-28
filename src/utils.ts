export function formatTimeFromISOString(isoString: string): string {
  const date = new Date(isoString);

  const format = (num: number): string => num.toString().padStart(2, "0");

  const hours = format(date.getUTCHours());
  const minutes = format(date.getUTCMinutes());

  return `${hours}:${minutes}`;
}

export function formatDateFromISOString(isoString: string): string {
  const date = new Date(isoString);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek = daysOfWeek[date.getUTCDay()];
  const dayOfMonth = date.getUTCDate();
  const month = months[date.getUTCMonth()];

  function getOrdinalSuffix(day: number) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const ordinalSuffix = getOrdinalSuffix(dayOfMonth);

  return `${dayOfWeek} ${dayOfMonth}${ordinalSuffix} ${month}`;
}
