export function parseCustomDate(dateString: string): Date {
  const months: { [key: string]: number } = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const parts = dateString.split(" ");
  if (parts.length !== 3) {
    throw new Error("Invalid date format.");
  }

  const month = months[parts[0]];
  const day = parseInt(parts[1].replace(/\D/g, ""));
  const year = parseInt(parts[2]);

  if (isNaN(month) || isNaN(day) || isNaN(year)) {
    throw new Error("Invalid date components.");
  }

  return new Date(year, month, day);
}
