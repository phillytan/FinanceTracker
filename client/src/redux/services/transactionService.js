const getTransactions = async () => {
    const response = await fetch('http://localhost:3000/transactions', {
      method: 'GET'
    });
    const data = await response.json()
    return data
  };

const updateTransaction = async (transaction) => {
    const response = await fetch(`http://localhost:3000/transactions/${transaction._id}`, {
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

const service = { getTransactions, updateTransaction }
export default service