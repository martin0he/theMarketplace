export const datePipe = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${String(
    date.getFullYear()
  ).slice(-2)}`;
};

export const calculateDaysAgo = (date: string): number => {
  const createdAt = new Date(date);
  const currentDate = new Date();
  const differenceInTime = currentDate.getTime() - createdAt.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
};
