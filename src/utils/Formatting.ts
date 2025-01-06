export function CurrencyFormat(value: number, currency: string) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: currency,
    }).format(value);
  }
export function YearMonthString(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()+1}`
}

export function InputMonthFormat(date: Date) {
  return new Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "2-digit",
  }).format(date)
}

export function CompareDates(date1: Date, date2: Date) {
  return date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
}