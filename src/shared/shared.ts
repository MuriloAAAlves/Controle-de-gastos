function getDaysInMonth(year: number, month: string) {
  const monthNumber = getMonthNumber(month)
  const firstDayOfNextMonth = new Date(year, monthNumber + 1, 1)
  const lastDayOfMonth = new Date(firstDayOfNextMonth.getTime() - 1)
  return lastDayOfMonth.getDate()
}

function getMonthNumber(month: string): number {
  const monthMap: Record<string, number> = {
    janeiro: 0,
    fevereiro: 1,
    março: 2,
    abril: 3,
    maio: 4,
    junho: 5,
    julho: 6,
    agosto: 7,
    setembro: 8,
    outubro: 9,
    novembro: 10,
    dezembro: 11
  }

  const monthNumber = monthMap[month.toLowerCase()]

  return monthNumber
}

export { getDaysInMonth, getMonthNumber }
