import { useState, useEffect } from 'react'
import { roundToTwoDecimals } from '../utils/math'
import { getExchangeRates } from '../utils/currency'
import { getDateOfLastMonth } from '../utils/date'

const useTransactionCategories = (transactions) => {
  const [recentTransactions, setRecentTransactions] = useState([])
  const [categoriesData, setCategoriesData] = useState([])
  const [exchangeRateMap, setExchangeRateMap] = useState({})

  useEffect(() => {
    const currentDate = new Date()
    const oneMonthAgo = getDateOfLastMonth(currentDate)
    const recent = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date)
      return oneMonthAgo <= transactionDate && transactionDate <= currentDate
    })
    setRecentTransactions(recent)
  }, [transactions])

  useEffect(() => {
    getExchangeRates(recentTransactions).then((res) => setExchangeRateMap(res))
  }, [recentTransactions])

  useEffect(() => {
    const getTransactionsCAD = async () =>
      await Promise.all(
        recentTransactions.map(async (transaction) => {
          return {
            currency: 'CAD',
            transactionType: transaction.transactionType,
            amount: roundToTwoDecimals(
              exchangeRateMap[transaction.currency] *
                Number(transaction.amount),
            ),
            date: transaction.date,
          }
        }),
      )

    getTransactionsCAD().then((res) => {
      const pieData = res.reduce((acc, transaction) => {
        const { amount, transactionType } = transaction
        const categoryExists = acc.find((item) => item.name === transactionType)
        if (categoryExists) {
          categoryExists.value += amount
        } else {
          acc.push({ name: transactionType, value: amount })
        }
        return acc
      }, [])

      setCategoriesData(
        pieData.map((category) => ({
          name: category.name,
          value: roundToTwoDecimals(category.value),
        })),
      )
    })
  }, [recentTransactions, exchangeRateMap])

  return { categoriesData }
}

export { useTransactionCategories }
