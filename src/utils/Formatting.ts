export function CurrencyFormat(value: number, currency: string) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: currency,
    }).format(value);
  }
export function YearMonthString(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()+1}`
}