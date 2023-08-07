import fetchHelper from "./fetchHelper";

const getSavings = async () => {
  const data = await fetchHelper("/savings", "GET", {});
  return data;
};

const addSavings = async (savings) => {
  const data = await fetchHelper("/savings", "POST", savings);
  return data;
};

const updateSaving = async (saving) => {
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