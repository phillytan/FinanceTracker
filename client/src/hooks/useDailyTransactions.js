import { getDatesOfPastMonth, getDateString } from '../utils/date'
import { roundToTwoDecimals } from '../utils/math'

export const useDailyTransactions = (transactions) => {
  const dates = getDatesOfPastMonth()
  const dailyTransactions = dates.map((date) => {
    const spending = { date }
    const dayTransactions = transactions.filter(
      (transaction) => getDateString(transaction.date) === date,
    )
    dayTransactions.forEach((transaction) => {
      const { transactionType, amount } = transaction
      if (!spending[transactionType]) {
        spending[transactionType] = amount
      } else {
        spending[transactionType] += amount
      }
    })
    Object.keys(spending).forEach((category) => {
      if (category !== 'date') {
        spending[category] = roundToTwoDecimals(spending[category])
      }
    })
    return spending
  })
  return { dailyTransactions }
}
