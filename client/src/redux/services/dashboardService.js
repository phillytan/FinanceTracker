import fetchHelper from "./fetchHelper";

const getSpendingPredictions = async () => {
    let data = await fetchHelper("/dashboard/spending-predictions", "GET", {});

    return data;
};

const service = { getSpendingPredictions}
export default service