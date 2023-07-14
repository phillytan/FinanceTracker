const url = 'http://localhost:3001';

const getTransactions = async () => {
    const response = await fetch(url + '/transactions', {
        method: 'GET'
    });
    const data = await response.json()
    return data
};

const addTransactions = async (transactions) => {
    const response = await fetch(url + '/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transactions)
    });
    const data = await response.json()
    return data
};

const updateTransaction = async (transaction) => {
    const response = await fetch(url + `/transactions/${transaction._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaction)
    })

    const data = await response.json()
    if (!response.ok) {
        const errorMsg = data?.message
        throw new Error(errorMsg)
    }
    return data
}

const deleteTransaction = async (transaction) => {
    const response = await fetch(url + `/transactions/${transaction._id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaction)
    })

    const data = await response.json()
    if (!response.ok) {
        const errorMsg = data?.message
        throw new Error(errorMsg)
    }
    return data
}

const service = { getTransactions, addTransactions, updateTransaction, deleteTransaction }

export default service