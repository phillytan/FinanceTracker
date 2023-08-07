import { getExchangeRatesWithDates, getRate } from "../../utils/currency";
import fetchHelper from "./fetchHelper";

const getSavings = async () => {
  const data = await fetchHelper("/savings", "GET", {});
  return data;
};

const addSavings = async (savings) => {
  const exchangeRateMap = await getExchangeRatesWithDates(savings);
  savings.map((entry) => {
    entry["amountInCAD"] =entry["amount"] * exchangeRateMap[entry["currency"]][entry["date"]]
  })
  const data = await fetchHelper("/savings", "POST", savings);
  return data;
};

const updateSaving = async (saving) => {
  let exchangeRate = await getRate(saving.currency, saving.date);
  saving.amountInCAD = saving.amount * exchangeRate;
  const data = await fetchHelper(
    `/savings/${saving._id}`,
    "PUT",
    saving
  );
  return data;
}

const deleteSaving = async (saving) => {
  const data = await fetchHelper(
    `/savings/${saving._id}`,
    "DELETE",
    saving
  );
  return data;
}

const service = { getSavings, addSavings, updateSaving, deleteSaving }

export default service