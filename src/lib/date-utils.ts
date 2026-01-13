export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

export const calculateEndDate = (startDate: Date, weeks: number): string => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + (weeks + 1) * 7);
  return formatDate(date);
};
