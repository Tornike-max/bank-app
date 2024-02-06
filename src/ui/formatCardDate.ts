export function formatCardDate(inputDate: string): string {
  const date = new Date(inputDate);

  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear().toString().slice(-2);

  return `${month}/${year}`;
}
