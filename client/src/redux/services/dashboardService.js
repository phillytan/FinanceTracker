import {transactionTypes } from '../../resources/transactionOptions.js';
import fetchHelper from "./fetchHelper";

const getSpendingPredictions = async () => {
    let sum = 0;

    return Promise.all(transactionTypes.map(async (type) => {
        let predictedValue = await fetchHelper(`/dashboard/spending-predictions/${type}`, "GET", {});
        return { name: type, prediction: predictedValue };
    }))
        .then((data) => {
            data.forEach((entry) => {
                sum = sum + entry.prediction});
            let result = {
                total: sum,
                categories: data
            }
            return result;
        })
        .catch((error) => { console.log(error) });
};

const service = { getSpendingPredictions}
export default service