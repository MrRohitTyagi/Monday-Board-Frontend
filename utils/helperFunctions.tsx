function generatePictureFallback(str = "") {
  return str.charAt(0) + str.charAt(str.length - 1);
}

function formatDate(date: Date, onlyDate?: boolean): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formattedDate: string = date
    .toLocaleDateString("en-GB", options)
    .replace(",", "");
  const [day, month, year, prefix, time]: string[] = formattedDate?.split(" ");

  const [hrs = "", min = ""] = time?.split(":");

  const period: string = parseInt(hrs) >= 12 ? "PM" : "AM";
  const hrs12format = parseInt(hrs) % 12;
  if (onlyDate === true) {
    return `${day} - ${month}`;
  } else {
    return `${day} - ${month}  ${prefix} ${hrs12format}:${min} ${period}`;
  }
}

// Get the formatted date string
interface TimeDifference {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  displayText: string;
  userFriendlyDate: string;
  twoDates: string;
}

function timeBetween(dateString: string, secondDate = ""): TimeDifference {
  // Parse the given date string
  const pastDate = new Date(dateString);

  // Get the current date
  const anotherDate = secondDate ? new Date(secondDate) : new Date();

  // Calculate the difference in time in milliseconds
  let differenceInTime = anotherDate.getTime() - pastDate.getTime();

  // Calculate days
  const days = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
  differenceInTime -= days * (1000 * 60 * 60 * 24);

  // Calculate hours
  const hours = Math.floor(differenceInTime / (1000 * 60 * 60));
  differenceInTime -= hours * (1000 * 60 * 60);

  // Calculate minutes
  const minutes = Math.floor(differenceInTime / (1000 * 60));
  differenceInTime -= minutes * (1000 * 60);

  // Calculate seconds
  const seconds = Math.floor(differenceInTime / 1000);

  const userFriendlyDate = formatDate(pastDate);

  const displayText =
    days > 0
      ? `${days} ${days > 1 ? "Days ago" : "Day ago"}`
      : hours > 0
      ? `${hours} ${hours > 1 ? "Hours ago" : "Hour ago"}`
      : minutes > 0
      ? `${minutes} ${minutes > 1 ? "Minutes ago" : "Minute ago"}`
      : "Now";

  const date1 = formatDate(pastDate, true);
  const date2 = formatDate(anotherDate, true);
  const twoDates = `${date1} - ${date2}`;
  return {
    days,
    hours,
    minutes,
    seconds,
    displayText,
    userFriendlyDate,
    twoDates,
  };
}

export function areDatesEqual(dateStr1: string, dateStr2: string) {
  // Parse the date strings into Date objects
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);

  // Compare the time values of the two dates
  return date1.getTime() === date2.getTime();
}

function formatNumber(num: number) {
  // Check if the number is an integer
  if (Number.isInteger(num)) {
    return num.toString();
  } else {
    // Round the number to two decimal places
    return num.toFixed(2);
  }
}
export { generatePictureFallback, timeBetween, formatNumber };
