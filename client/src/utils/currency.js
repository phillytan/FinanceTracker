export const getRate = async (currency) => {
  const currencyCode = currency.toLowerCase();
  const response = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currencyCode}/cad.json`
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
