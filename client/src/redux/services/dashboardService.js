import { transactionTypes } from '../../resources/transactionOptions.js';
import fetchHelper from "./fetchHelper";

const getSpendingPredictions = async () => {
    let result = {
        total: 0,
        categories: []
    }

    return Promise.all(transactionTypes.map(async (type) => {
        let predictedValue = await fetchHelper(`/dashboard/spending-predictions/${type}`, "GET", {});
        return { name: type, prediction: predictedValue };
    }))
        .then((data) => {
            result.total = 	data.reduce((sum, category) => {
                return sum + category.prediction;
            }, 0);
            result.categories = data;

            return result;
        })
        .catch((error) => {
            console.log(error)
            return result;
        });
};

const service = { getSpendingPredictions }
export default service