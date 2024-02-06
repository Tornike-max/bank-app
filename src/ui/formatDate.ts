export function formatDate(dateString: string): string {
  const dateObject: Date = new Date(dateString);
  return dateObject.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
