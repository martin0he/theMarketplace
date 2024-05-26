export const datePipe = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${String(
    date.getFullYear()
  ).slice(-2)}`;
};
