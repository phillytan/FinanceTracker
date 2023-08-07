import fetchHelper from "./fetchHelper";

const getTransactions = async () => {
  const data = await fetchHelper("/transactions", "GET", {});
  return data;
};

const getTopCategories = async ({startDate, endDate}) => {
  const data = await fetchHelper(
    `/transactions/topCategories/${startDate}/${endDate}`, "GET", {});
  return data;
};

const addTransactions = async (transactions) => {
  const data = await fetchHelper("/transactions", "POST", transactions);
  return data;
};

const updateTransaction = async (transaction) => {
  const data = await fetchHelper(
		`/transactions/${transaction._id}`,
		"PUT",
		transaction
	);
  return data;
}

const deleteTransaction = async (transaction) => {
  const data = await fetchHelper(
    `/transactions/${transaction._id}`,
    "DELETE",
    transaction
  );
  return data;
}

const service = { getTransactions, getTopCategories, addTransactions, updateTransaction, deleteTransaction }

export default service