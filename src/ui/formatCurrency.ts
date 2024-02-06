export function formatCurrency(amount: number, currency: string): string {
  const currencySymbol: string =
    currency === "USD"
      ? "$"
      : currency === "EUR"
      ? "€"
      : currency === "GBP"
      ? "£"
      : "$";
  const formattedAmount: string = amount
    ?.toFixed(2)
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${currencySymbol}${formattedAmount}`;
}
