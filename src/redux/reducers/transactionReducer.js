import data from '../../resources/data.json';
const { v4: uuid } = require('uuid');
const initialState = {
    transaction: data
};

const transactionReducer = (transactions = initialState, action) => {
    switch (action.type) {
        case "ADD_TRANSACTION":
            console.log("Adding transaction " + action.payload);
            action.payload.id = uuid();
            return {
                ...transactions,
                transaction: [...transactions.transaction, action.payload]
            };
        case "UPDATE_TRANSACTION":
            console.log("Updating transaction " + Object.values(action.payload));
            console.log()

            return transactions.map((trans, index) => {
                if (trans.id === action.payload.id) {
                    return {
                        ...trans,
                        index: action.payload
                    }
                }
                return trans;
            });
        default:
            return transactions;
    }
}

export default transactionReducer;