export const getRate = async (currency, date = 'latest') => {
  date = (date === 'latest')? date: new Date(date).toISOString().substring(0, 10)
  const currencyCode = currency.toLowerCase();
  const response = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${date}/currencies/${currencyCode}/cad.json`
  );
  const data = await response.json();
  return data["cad"];
};

export const getExchangeRates = async (transactions) => {
  const currencies = new Set(
    transactions.map((transaction) => transaction.currency)
  );
  const exchangeRateMap = {};
  await Promise.all(
    Array.from(currencies).map(async (currency) => {
      exchangeRateMap[currency] = await getRate(currency);
    })
  );
  return exchangeRateMap;
};

export const getExchangeRatesWithDates = async (transactions) => {
  const exchangeRateMap = {};
  transactions.forEach((transaction) => exchangeRateMap[transaction.currency] = {})

  await Promise.all(
    Array.from(transactions).map(async (transaction) => {
        let cad = await getRate(transaction.currency, (transaction.date));
        exchangeRateMap[transaction.currency][transaction.date] = cad;
    })
  );
  return exchangeRateMap;
};