import { getExchangeRatesWithDates, getRate } from '../../utils/currency'
import fetchHelper from './fetchHelper'

const getTransactions = async () => {
  const data = await fetchHelper('/transactions', 'GET', {})
  return data
}

const getTopCategories = async ({ startDate, endDate }) => {
  const data = await fetchHelper(
    `/transactions/topCategories/${startDate}/${endDate}`,
    'GET',
    {},
  )
  return data
}

const addTransactions = async (transactions) => {
  const exchangeRateMap = await getExchangeRatesWithDates(transactions)
  transactions.map((entry) => {
    entry['amountInCAD'] =
      entry['amount'] * exchangeRateMap[entry['currency']][entry['date']]
  })
  const data = await fetchHelper('/transactions', 'POST', transactions)
  return data
}

const updateTransaction = async (transaction) => {
  let exchangeRate = await getRate(transaction.currency, transaction.date)
  transaction.amountInCAD = transaction.amount * exchangeRate
  const data = await fetchHelper(
    `/transactions/${transaction._id}`,
    'PUT',
    transaction,
  )
  return data
}

const deleteTransaction = async (transaction) => {
  const data = await fetchHelper(
    `/transactions/${transaction._id}`,
    'DELETE',
    transaction,
  )
  return data
}

const service = {
  getTransactions,
  getTopCategories,
  addTransactions,
  updateTransaction,
  deleteTransaction,
}

export default service
