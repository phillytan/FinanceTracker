export const addTransactionItem = transaction => {
    return {
        type: "ADD_TRANSACTION",
        payload: transaction
    };
}

export const updateTransactionItem = transaction => {
    return {
        type: "UPDATE_TRANSACTION",
        payload: transaction
    };
}

export const deleteTransactionItem = transaction => {
    return {
        type: "DELETE_TRANSACTION",
        payload: transaction
    };
}